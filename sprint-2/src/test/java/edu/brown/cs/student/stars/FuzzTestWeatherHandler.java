package edu.brown.cs.student.stars;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.squareup.moshi.JsonDataException;
import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.ErrBadJsonResponse;
import edu.brown.cs.student.server.WeatherHandler;
import java.io.IOException;
import java.math.RoundingMode;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DecimalFormat;
import java.util.Random;
import java.util.logging.Level;
import java.util.logging.Logger;
import okio.Buffer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import spark.Spark;

/** Performs fuzz testing for weather requests with random coordinates covering continental USA */
public class FuzzTestWeatherHandler {

  @BeforeAll
  public static void spark_port_setup() {
    System.out.println("port setup called.");
    Spark.port(0);
    Logger.getLogger("").setLevel(Level.WARNING);
  }

  @BeforeEach
  public void setup() {
    System.out.println("setup called.");

    // In fact, restart the entire Spark server for every test!
    Spark.get("/weather", new WeatherHandler());
    Spark.init();
    Spark.awaitInitialization(); // don't continue until the server is listening
  }

  @AfterEach
  public void teardown() {
    System.out.println("teardown called.");
    // Gracefully stop Spark listening on both endpoints
    Spark.unmap("/weather");
    Spark.awaitStop(); // don't proceed until the server is stopped
  }

  /** Constants can be manually modified to easily adjust fuzz testing parameters. */
  static final int NUM_TRIALS = 100;

  static final double MIN_LAT = 25.0; // to include Alaska/Hawaii: min = 18.0
  static final double MAX_LAT = 50.0; // to include Alaska/Hawaii: max = 75.0
  static final double MIN_LON = -125.0; // to include Alaska/Hawaii: min = -180.0
  static final double MAX_LON = -65.0; // to include Alaska/Hawaii: max = -65.0

  /**
   * Generates a random latitude value within the given range.
   *
   * @return a double representing the latitude with maximum 4 decimal places
   */
  public double generateLat() {

    double randLat = MIN_LAT + new Random().nextDouble() * (MAX_LAT - MIN_LAT);

    DecimalFormat df = new DecimalFormat("#.####");
    df.setRoundingMode(RoundingMode.CEILING);
    return Double.parseDouble(df.format(randLat));
  }

  /**
   * Generates a random longitude value within the given range.
   *
   * @return a double representing the longitude with maximum 4 decimal places
   */
  public double generateLon() {
    double randLon = MIN_LON + new Random().nextDouble() * (MAX_LON - MIN_LON);

    DecimalFormat df = new DecimalFormat("#.####");
    df.setRoundingMode(RoundingMode.CEILING);
    return Double.parseDouble(df.format(randLon));
  }

  /**
   * Tests random coordinates for weather requests.
   *
   * @throws IOException if the connection fails for some reason
   */
  @Test
  public void fuzzTestWeather() throws IOException {
    double lat = 0.0;
    double lon = 0.0;
    for (int counter = 0; counter < NUM_TRIALS; counter++) {
      try {
        lat = generateLat();
        lon = generateLon();
        URL requestURL =
            new URL("http://localhost:" + Spark.port() + "/weather?lat=" + lat + "&lon=" + lon);
        HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
        clientConnection.connect();
        assertEquals(200, clientConnection.getResponseCode());

        Moshi moshi = new Moshi.Builder().build();
        // success case
        WeatherHandler.WeatherSuccessResponse response =
            moshi
                .adapter(WeatherHandler.WeatherSuccessResponse.class)
                .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

        clientConnection.disconnect();

        System.out.println(
            "Test " + counter + ": (lat=" + lat + ", lon=" + lon + ") had a success response!");
      } catch (JsonDataException e) {
        URL requestURL =
            new URL("http://localhost:" + Spark.port() + "/weather?lat=" + lat + "&lon=" + lon);
        HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
        clientConnection.connect();
        assertEquals(200, clientConnection.getResponseCode());

        // bad json error case
        ErrBadJsonResponse response = new ErrBadJsonResponse();
        Moshi moshi = new Moshi.Builder().build();
        // assert that expected and actual class types are equal
        assertEquals(
            response.getClass(),
            moshi
                .adapter(ErrBadJsonResponse.class)
                .fromJson(new Buffer().readFrom(clientConnection.getInputStream()))
                .getClass());

        System.out.println(
            "Test "
                + counter
                + ": (lat="
                + lat
                + ", lon="
                + lon
                + ") had an error_bad_json response!");
      } catch (Exception e) {
        System.out.println("Exception thrown with " + lat + ", " + lon);
        e.printStackTrace();
      }
    }
    System.out.println("All " + NUM_TRIALS + " fuzz test trials passed!");
  }
}
