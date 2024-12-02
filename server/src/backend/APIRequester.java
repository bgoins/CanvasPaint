package backend;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class APIRequester 
{
    public String getApiResponse(String apiUrl) 
    {
        StringBuilder response = new StringBuilder();

        try 
        {
            URL url = new URL(apiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");

            if (conn.getResponseCode() != HttpURLConnection.HTTP_OK) 
            {
                throw new RuntimeException("HTTP error code : " + conn.getResponseCode());
            }

            BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
            String line;
            while ((line = br.readLine()) != null) 
            {
                response.append(line);
            }
            conn.disconnect();
        } 
        catch (Exception e) 
        {
            e.printStackTrace();
        }

        return response.toString();
    }

}
