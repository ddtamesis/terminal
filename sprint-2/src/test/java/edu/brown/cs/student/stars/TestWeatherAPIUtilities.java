package edu.brown.cs.student.stars;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import edu.brown.cs.student.server.ErrBadJsonResponse;
import edu.brown.cs.student.server.WeatherAPIUtilities;
import edu.brown.cs.student.server.WeatherHandler.ForecastResponse;
import edu.brown.cs.student.server.WeatherHandler.PointsResponse;
import edu.brown.cs.student.server.WeatherHandler.WeatherSuccessResponse;
import java.io.IOException;
import org.junit.jupiter.api.Test;

/** Tests Weather API Utilities without accessing external API for tests */
public class TestWeatherAPIUtilities {

  @Test
  public void testFrom_ValidPointsRequest() throws IOException {
    PointsResponse pr = WeatherAPIUtilities.fromJsonPr(WeatherJsonConstants.POINTS_RESPONSE_JSON);
    // assert equals pr.properties.forecast, "https://api.weather.gov/gridpoints/BOX/64,64/forecast"
    assertEquals(
        pr.getProperties().getForecast(), "https://api.weather.gov/gridpoints/BOX/64,64/forecast");
  }

  @Test
  public void testFrom_ValidForecastRequest() throws IOException {
    ForecastResponse fr =
        WeatherAPIUtilities.fromJsonFr(WeatherJsonConstants.FORECAST_RESPONSE_JSON);
    assertEquals(fr.getProperties().getPeriods().get(0).getTemperature(), 66);
  }

  @Test
  public void testTo_WeatherSuccessResponse() {
    WeatherSuccessResponse mockWSR = new WeatherSuccessResponse(41.8268, -71.4029, 66);
    assertEquals(
        "{\"result\":\"success\",\"lat\":41.8268,\"lon\":-71.4029,\"temperature\":66}",
        WeatherAPIUtilities.toJsonWeatherSuccess(mockWSR));
  }

  @Test
  public void testTo_ErrorBadJsonResponse() {
    ErrBadJsonResponse mockEBJ = new ErrBadJsonResponse();
    assertEquals("{\"result\":\"error_bad_json\"}", WeatherAPIUtilities.toJsonErrBad(mockEBJ));
  }

  @Test
  public void testFrom_MalformedJson() {
    String badJson = "{{malformed,,{json}.";
    assertThrows(IOException.class, () -> WeatherAPIUtilities.fromJsonPr(badJson));
    assertThrows(IOException.class, () -> WeatherAPIUtilities.fromJsonFr(badJson));
  }
}
