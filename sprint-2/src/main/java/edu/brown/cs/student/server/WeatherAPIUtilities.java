package edu.brown.cs.student.server;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.WeatherHandler.ForecastResponse;
import edu.brown.cs.student.server.WeatherHandler.PointsResponse;
import edu.brown.cs.student.server.WeatherHandler.WeatherSuccessResponse;
import java.io.IOException;

/**
 * Contains utility methods for handling weather request objects (deserialization and serialization)
 */
public class WeatherAPIUtilities {

  /**
   * Helper to build PointsResponse moshi adapter
   *
   * @return the adapter
   */
  private static JsonAdapter<PointsResponse> createPrAdapter() {
    Moshi moshi = new Moshi.Builder().build();
    return moshi.adapter(PointsResponse.class);
  }

  /**
   * Converts the valid Json body from a successful points response and deserializes it
   *
   * @param jsonBody - the json to deserialize into a PointsResponse object
   * @return the PointsResponse object
   * @throws IOException if there is an I/O exception
   */
  public static PointsResponse fromJsonPr(String jsonBody) throws IOException {
    JsonAdapter<PointsResponse> adapter = createPrAdapter();
    return adapter.fromJson(jsonBody);
  }

  /**
   * Helper to build ForecastResponse moshi adapter
   *
   * @return the adapter
   */
  private static JsonAdapter<ForecastResponse> createFrAdapter() {
    Moshi moshi = new Moshi.Builder().build();
    return moshi.adapter(ForecastResponse.class);
  }

  /**
   * Converts the valid Json body from a successful forecast response and deserializes it
   *
   * @param jsonBody - the json to deserialize into a ForecastResponse object
   * @return the ForecastResponse object
   * @throws IOException if there is an I/O exception
   */
  public static ForecastResponse fromJsonFr(String jsonBody) throws IOException {
    JsonAdapter<ForecastResponse> adapter = createFrAdapter();
    return adapter.fromJson(jsonBody);
  }

  /**
   * Converts the WeatherSuccessResponse object to a Json String and serializes it
   *
   * @param wsr - the WeatherSuccessResponse to be converted
   * @return the serialized Json String
   */
  public static String toJsonWeatherSuccess(WeatherSuccessResponse wsr) {
    Moshi moshi = new Moshi.Builder().build();
    JsonAdapter<WeatherSuccessResponse> adapter = moshi.adapter(WeatherSuccessResponse.class);
    return adapter.toJson(wsr);
  }

  /**
   * Converts the ErrBadJsonResponse object to a Json String and serializes it
   *
   * @param ebj - the ErrBadJsonResponse to be converted
   * @return the serialized Json String
   */
  public static String toJsonErrBad(ErrBadJsonResponse ebj) {
    Moshi moshi = new Moshi.Builder().build();
    JsonAdapter<ErrBadJsonResponse> adapter = moshi.adapter(ErrBadJsonResponse.class);
    return adapter.toJson(ebj);
  }
}
