package com.demo.adapter;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.io.IOUtils;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.xml.sax.SAXException;

import com.ibm.mfp.adapter.api.ConfigurationAPI;
import com.ibm.mfp.adapter.api.OAuthSecurity;

@Api(value = "Address Adapter Resource")
@Path("/")
public class AddressAdapterResource {
	/*
	 * For more info on JAX-RS see
	 * https://jax-rs-spec.java.net/nonav/2.0-rev-a/apidocs/index.html
	 */

	// Define logger (Standard java.util.Logger)
	static Logger logger = Logger.getLogger(UsersAdapterResource.class.getName());

  private static final String LOG_TAG = "Address Adapter with Google Places Autocomplete";
  private static final String PLACES_API_HOST = "https://maps.googleapis.com";
  private static final String PLACES_API_PATH = "/maps/api/place/autocomplete";
  private static final String PLACES_API_BASE = "https://maps.googleapis.com/maps/api/place/autocomplete";
  private static final String OUT_JSON = "/json";
  private static final String API_KEY = "AIzaSyBczZsLMbyS8MCgVmcwN7IBEER3o0oOJeM";

	// Inject the MFP configuration API:
	@Context
	ConfigurationAPI configApi;

  //WLServerAPI api = WLServerAPIProvider.getWLServerAPI();

  private static CloseableHttpClient client;
  private static HttpHost host;

  public static void init() {
		client = HttpClients.createDefault();
		// host = new HttpHost("developer.ibm.com");
		host = new HttpHost(PLACES_API_HOST);
	}

  private void execute(final HttpUriRequest req, final HttpServletResponse resultResponse)
			throws ClientProtocolException, IOException, IllegalStateException, SAXException {
		logger.info("AddressAdapterResource execute");
		HttpResponse response = client.execute(host, req);
		logger.info("AddressAdapterResource executed");
		ServletOutputStream os = resultResponse.getOutputStream();
		if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
			logger.info("AddressAdapterResource status OK");
			resultResponse.addHeader("Content-Type", "application/json");
      InputStream inputStream = response.getEntity().getContent();
      // String json = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
      String json = IOUtils.toString(inputStream, "UTF-8");
			logger.info("AddressAdapterResource json: \n" + json);
			// String json = response.getEntity().getContent().;
			os.write(json.getBytes(StandardCharsets.UTF_8));
		} else {
			logger.info("AddressAdapterResource status not OK: " + response.getStatusLine().getStatusCode());
			logger.info("AddressAdapterResource status not OK: " + response.getStatusLine().getReasonPhrase());
			logger.info("AddressAdapterResource status not OK: " + req.getURI().toString());
			resultResponse.setStatus(response.getStatusLine().getStatusCode());
			response.getEntity().getContent().close();
			os.write(response.getStatusLine().getReasonPhrase().getBytes());
		}
		os.flush();
		os.close();
	}

  @GET
  @Path("/autocomplete")
  @Produces("application/json")
	@OAuthSecurity(enabled = false)
  public void get(@Context HttpServletResponse response, @QueryParam("input") String input)
    throws ClientProtocolException, IOException, IllegalStateException, SAXException, UnsupportedEncodingException {
    if (input != null && !input.isEmpty()) {
      execute(new HttpGet(getUrl(input)), response);
    } else {
      execute(new HttpGet(getUrl(input)), response);
    }
  }

  protected String getUrl(final String input) throws UnsupportedEncodingException {
    StringBuilder sb = new StringBuilder(PLACES_API_BASE + OUT_JSON);
    // StringBuilder sb = new StringBuilder(PLACES_API_PATH + OUT_JSON);
    sb.append("?key=" + API_KEY);
    sb.append("&input=" + URLEncoder.encode(input, "utf8"));
    return sb.toString();
  }

	//Path for method: "<server address>/mfp/api/adapters/UsersAdapter/{username}"
	@GET
	@Path("/address/{input}")
	@Produces(MediaType.TEXT_PLAIN)
	public String getUser(@PathParam("input") String input){

    HttpURLConnection conn = null;
    StringBuilder jsonResults = new StringBuilder();

    StringBuilder sb = new StringBuilder(PLACES_API_BASE + OUT_JSON);
    try {
      sb.append("?key=" + API_KEY);
      sb.append("&input=" + URLEncoder.encode(input, "utf8"));

      URL url = new URL(sb.toString());
      conn = (HttpURLConnection) url.openConnection();
      InputStreamReader in = new InputStreamReader(conn.getInputStream());
      int read;
      char[] buff = new char[1024];
      while ((read = in.read(buff)) != -1) {
          jsonResults.append(buff, 0, read);
      }
    } catch (MalformedURLException e) {
      //logger.error("Error processing Places API URL", e);
      return "MalformedURLException";
    } catch (java.io.UnsupportedEncodingException e) {
      return "UnsupportedEncodingException";
    } catch (IOException e) {
      //logger.error("Error connecting to Places API", e);
      return "Exception while connecting to " + sb + "\nReason: " + e.getMessage();
    } finally {
      if (conn != null) {
        conn.disconnect();
      }
    }

		return jsonResults.toString();
	}

}
