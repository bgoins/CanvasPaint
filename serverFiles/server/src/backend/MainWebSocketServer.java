package backend;
import java.net.InetSocketAddress;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

public class MainWebSocketServer extends WebSocketServer 
{
	private static final boolean PULLAPI = false;
    private static BlockingQueue<WebSocket> newConnectionQueue = new LinkedBlockingQueue<>();

    public MainWebSocketServer(int port) 
    {
        super(new InetSocketAddress(port));
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) 
    {
        System.out.println("New connection: " + conn.getRemoteSocketAddress());
        
        try 
        {
            newConnectionQueue.put(conn);
        } 
        catch (InterruptedException e) 
        {
            e.printStackTrace();
        }
    }

    @Override
    public void onMessage(WebSocket conn, String message) 
    {
        System.out.println("Message from client: " + message);
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) 
    {
        System.out.println("Closed connection: " + conn.getRemoteSocketAddress());
    }

    @Override
    public void onError(WebSocket conn, Exception ex) 
    {
        ex.printStackTrace();
    }

    @Override
    public void onStart() 
    {
        System.out.println("Server started successfully!");
        new Thread(new MessageSender()).start();
    }
    
    public void sendMessageToAllClients(String message) 
    {
        for (WebSocket conn : this.getConnections()) 
        {
            conn.send(message);
        }
    }
    
    private static class MessageSender implements Runnable 
    {
        @Override
        public void run() 
        {
            while (true) 
            {
                try 
                {
                    WebSocket conn = newConnectionQueue.take();
                    
                    if (PULLAPI) 
                    {
						String apiurl = "https://canvas-api-url";
						APIRequester req = new APIRequester();
						String requestMessage = req.getApiResponse(apiurl);
						conn.send(requestMessage);
						System.out.println("Sent requested message: " + requestMessage);
					}
                    else
                    {
                    	APISpoofer spoof = new APISpoofer();
                        String spoofedMessage = spoof.spoofedmsg();
                        conn.send(spoofedMessage);
                        System.out.println("Sent spoofed message: " + spoofedMessage);
                    }

                    Thread.sleep(500);
                } 
                catch (InterruptedException e) 
                {
                    e.printStackTrace();
                    break;
                }
            }
        }
    }

    public static void main(String[] args) 
    {
        int port = 8081;
        MainWebSocketServer server = new MainWebSocketServer(port);

        server.start();
        System.out.println("WebSocket server started on ws://localhost:" + port);
        
    }
}
