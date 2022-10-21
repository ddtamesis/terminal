package edu.brown.cs.student.server;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs.student.datasource.ExternalAPIHandler;
import java.util.List;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Handler class for the weather endpoint. It takes a basic GET request with no Json body, and
 * returns a Json object in reply. It's a subclass of ExternalAPIHandler.
 */
public class WeatherHandler extends ExternalAPIHandler implements Route {

  /** Constructor of WeatherHandler. */
  public WeatherHandler() {
    super();
  }

  /**
   * Method that handles get request and outputs a serialized response.
   *
   * @param request - the request to handle
   * @param response - the response to modify
   * @return A serialized success response or error
   * @throws Exception
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    try {
      String lat = request.queryParams("lat");
      String lon = request.queryParams("lon");
      // first external http request
      String pointsResponseJson =
          this.externalGet("https://api.weather.gov/points/" + lat + "," + lon);

      PointsResponse pr = WeatherAPIUtilities.fromJsonPr(pointsResponseJson);
      String forecastLink = pr.properties.forecast;

      // second external http request
      String forecastJsonBody = this.externalGet(forecastLink); // method from parent abstract class
      ForecastResponse fr = WeatherAPIUtilities.fromJsonFr(forecastJsonBody);

      return new WeatherSuccessResponse(
              Double.parseDouble(lat),
              Double.parseDouble(lon),
              fr.properties.periods.get(0).temperature)
          .serialize();
    } catch (NullPointerException e) {
      // if pr.properties is null or fr.properties is null
      // i.e. an error from NWS API with points or gridpoints request
      return new ErrBadJsonResponse().serialize();
    } catch (Exception e) {
      // add message later
      e.printStackTrace();
      throw e;
    }
  }

  /** Response object to send, containing success notification and temperature */
  public record WeatherSuccessResponse(String result, double lat, double lon, int temperature) {
    public WeatherSuccessResponse(double lat, double lon, int temperature) {
      this("success", lat, lon, temperature);
    }

    /**
     * @return this response, serialized as Json
     */
    String serialize() {
      try {
        Moshi moshi = new Moshi.Builder().build();

        JsonAdapter<WeatherSuccessResponse> adapter = moshi.adapter(WeatherSuccessResponse.class);
        return adapter.toJson(this);
      } catch (Exception e) {
        e.printStackTrace();
        throw e;
      }
    }
  }

  /** Classes used to deserialize from the National Weather Service API */
  public static class PointsResponse {
    private PointsResponseProperties properties;

    /** Getter method that is used for testing purposes */
    public PointsResponseProperties getProperties() {
      return properties;
    }
  }

  public static class PointsResponseProperties {
    private String forecast;

    /** Getter method that is used for testing purposes */
    public String getForecast() {
      return forecast;
    }
  }

  public static class ForecastResponse {
    private ForecastResponseProperties properties;

    /** Getter method that is used for testing purposes */
    public ForecastResponseProperties getProperties() {
      return this.properties;
    }
  }

  public static class ForecastResponseProperties {
    private List<Period> periods;

    /** Getter method that is used for testing purposes */
    public List<Period> getPeriods() {
      return this.periods;
    }
  }

  public static class Period {
    int temperature;

    /** Getter method that is used for testing purposes */
    public int getTemperature() {
      return this.temperature;
    }
  }
}
