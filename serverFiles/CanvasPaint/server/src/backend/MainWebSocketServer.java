package backend;

import java.net.InetSocketAddress;
import java.util.List;
import java.util.ArrayList;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

public class MainWebSocketServer extends WebSocketServer {
    private static final boolean PULLAPI = false; // if true, use APIRequester. else, use APISpoofer
    private static List<WebSocket> activeConnections = new ArrayList<>(); // list to store active WebSocket connections
    private static String lastSentMessage = "";

    // Create the websocket server
    public MainWebSocketServer(int port) 
    {
        super(new InetSocketAddress(port));
    }

    // On connection (new WebSocket connection is made/page refresh)
    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) 
    {
        System.out.println("New connection: " + conn.getRemoteSocketAddress());
        synchronized (activeConnections) 
        {
            activeConnections.add(conn);
        }
        
        // Send the last sent message to the newly connected client
        if (!lastSentMessage.isEmpty()) 
        {
            conn.send(lastSentMessage); 
            System.out.println("Sent message: " + lastSentMessage);
        }
    }

    // Log messages from client
    @Override
    public void onMessage(WebSocket conn, String message) {
        System.out.println("Message from client: " + message);
    }

    // Log when connection closes
    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) 
    {
        System.out.println("Closed connection: " + conn.getRemoteSocketAddress());
        synchronized (activeConnections) 
        {
            activeConnections.remove(conn);
        }
    }

    // Log when error happens
    @Override
    public void onError(WebSocket conn, Exception ex) 
    {
        ex.printStackTrace();
    }

    // Log when WebSocket server starts, and start the message sender thread
    @Override
    public void onStart() 
    {
        System.out.println("Server started successfully!");
        new Thread(new MessageSender()).start();
    }

    // Helper function to send messages to all connected clients
    public static void sendMessageToAllClients(String message) 
    {
        synchronized (activeConnections) 
        {
            for (WebSocket conn : activeConnections) 
            {
                if (conn.isOpen()) 
                {
                    conn.send(message);
                }
            }
        }
    }

    // Thread to send messages to clients. This handles sending new API requests or spoofed messages.
    private static class MessageSender implements Runnable 
    {
        private String oldMessage = "";

        @Override
        public void run() 
        {
            while (true) 
            {
                try 
                {
                    Thread.sleep(1000);

                    String messageToSend = null;
                    
                    if (PULLAPI) 
                    {
                        // Pull new message from APIRequester
                        String apiUrl = "https://canvas-api-url";
                        APIRequester req = new APIRequester();
                        messageToSend = req.getApiResponse(apiUrl);
                    } 
                    else 
                    {
                        // Use APISpoofer to generate a spoofed message
                        APISpoofer spoof = new APISpoofer();
                        messageToSend = spoof.spoofedmsg();
                    }

                 // Check if the new message is different from the last sent message
                    if (messageToSend != null && !messageToSend.equals(oldMessage)) 
                    {
                        // Only send the message if there are active connections
                        synchronized (activeConnections) 
                        {
                            if (!activeConnections.isEmpty()) 
                            {
                                sendMessageToAllClients(messageToSend);
                                oldMessage = messageToSend;
                                lastSentMessage = messageToSend;

                                System.out.println("Sent message: " + messageToSend);
                            }
                        }
                    }

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
