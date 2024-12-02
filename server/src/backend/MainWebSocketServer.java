package backend;
import java.net.InetSocketAddress;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

public class MainWebSocketServer extends WebSocketServer 
{

    public MainWebSocketServer(InetSocketAddress address) 
    {
        super(address);
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) 
    {
        System.out.println("New connection: " + conn.getRemoteSocketAddress());
        conn.send("Welcome to the WebSocket server!");
    }

    @Override
    public void onMessage(WebSocket conn, String message) 
    {
        System.out.println("Message from client: " + message);
        conn.send("Echo: " + message);
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
    }
    
    public void sendMessageToAllClients(String message) 
    {
        for (WebSocket conn : this.getConnections()) 
        {
            conn.send(message);
        }
    }

    public static void main(String[] args) 
    {
        int port = 8080;
        MainWebSocketServer server = new MainWebSocketServer(new InetSocketAddress(port));
        String apiURL = "https://randomuser.me/api/";
        APIRequester request = new APIRequester();
        String response = "";

        server.start();
        System.out.println("WebSocket server started on ws://localhost:" + port);
        for(int i=0; i<5; i++)
        {
        	try 
        	{
				Thread.sleep(1000);
			} catch (InterruptedException e) 
        	{
				e.printStackTrace();
			}
        	response = request.getApiResponse(apiURL);
        }
        server.sendMessageToAllClients(response);
    }
}
