package edu.brown.cs.student.stars;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.csv.CSVParser;
import edu.brown.cs.student.csv.FactoryFailureException;
import edu.brown.cs.student.datasource.Database;
import edu.brown.cs.student.server.ErrBadJsonResponse;
import edu.brown.cs.student.server.ErrBadRequestResponse;
import edu.brown.cs.student.server.ErrDatasourceResponse;
import edu.brown.cs.student.server.GetCSVHandler;
import edu.brown.cs.student.server.LoadCSVHandler;
import edu.brown.cs.student.server.WeatherHandler;
import java.io.FileReader;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import okio.Buffer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import spark.Spark;

public class TestAPIHandlers {

  @BeforeAll
  public static void spark_port_setup() {
    Spark.port(0);
    Logger.getLogger("").setLevel(Level.WARNING);
  }

  private Database<List<List<String>>> csvDatabase = new Database<List<List<String>>>();

  @BeforeEach
  public void setup() {
    // Re-initialize state, etc. for _every_ test method run
    this.csvDatabase = new Database<>();

    // In fact, restart the entire Spark server for every test!
    Spark.get("/loadcsv", new LoadCSVHandler(this.csvDatabase));
    Spark.get("/getcsv", new GetCSVHandler(this.csvDatabase));
    Spark.get("/weather", new WeatherHandler());
    Spark.init();
    Spark.awaitInitialization(); // don't continue until the server is listening
  }

  @AfterEach
  public void teardown() {
    // Gracefully stop Spark listening on both endpoints
    Spark.unmap("/loadcsv");
    Spark.unmap("/getcsv");
    Spark.unmap("/weather");
    Spark.awaitStop(); // don't proceed until the server is stopped
  }

  /**
   * Testing a loadcsv get request and corresponding success response with a valid filepath
   *
   * @throws IOException
   */
  @Test
  public void testValidFilePath() throws IOException {
    URL requestURL =
        new URL(
            "http://localhost:"
                + Spark.port()
                + "/"
                + "loadcsv?filepath=data/testing/test-basic.csv");
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
    clientConnection.connect();
    assertEquals(200, clientConnection.getResponseCode());
    Moshi moshi = new Moshi.Builder().build();
    LoadCSVHandler.LoadCSVSuccessResponse response =
        moshi
            .adapter(LoadCSVHandler.LoadCSVSuccessResponse.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    LoadCSVHandler.LoadCSVSuccessResponse mock =
        new LoadCSVHandler.LoadCSVSuccessResponse("success", "data/testing/test-basic.csv");
    assertEquals(mock, response);
    clientConnection.disconnect();
  }

  /**
   * Testing a loadcsv get request and corresponding error response with a missing filepath
   *
   * @throws IOException
   */
  @Test
  public void testMissingFilePath() throws IOException {
    URL requestURL = new URL("http://localhost:" + Spark.port() + "/" + "loadcsv?filepath=");
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
    clientConnection.connect();
    assertEquals(200, clientConnection.getResponseCode());
    Moshi moshi = new Moshi.Builder().build();
    ErrBadRequestResponse response =
        moshi
            .adapter(ErrBadRequestResponse.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    ErrBadRequestResponse mock = new ErrBadRequestResponse();
    assertEquals(mock.getClass(), response.getClass());
    clientConnection.disconnect();
  }

  /**
   * Testing a loadcsv get request and corresponding error response with an invalid filepath
   *
   * @throws IOException
   */
  @Test
  public void testInvalidFilePath() throws IOException {
    URL requestURL =
        new URL(
            "http://localhost:" + Spark.port() + "/" + "loadcsv?filepath=testing/test-basic.csv");
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
    clientConnection.connect();
    assertEquals(200, clientConnection.getResponseCode());
    Moshi moshi = new Moshi.Builder().build();
    ErrDatasourceResponse response =
        moshi
            .adapter(ErrDatasourceResponse.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    ErrDatasourceResponse mock = new ErrDatasourceResponse();
    assertEquals(mock.getClass(), response.getClass());
    clientConnection.disconnect();
  }

  /**
   * Testing a getcsv request and corresponding success response when a valid file has already been
   * loaded
   *
   * @throws IOException
   */
  @Test
  public void testGetCSVAfterLoad() throws IOException, FactoryFailureException {
    // mocking that we already loaded a file
    CSVParser<List<String>> csvParser =
        new CSVParser<>(new FileReader("data/testing/test-basic.csv"));
    this.csvDatabase.setParser(csvParser);
    this.csvDatabase.loadFile("data/testing/test-basic.csv");

    URL requestURL = new URL("http://localhost:" + Spark.port() + "/" + "getcsv");
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
    clientConnection.connect();
    assertEquals(200, clientConnection.getResponseCode());
    Moshi moshi = new Moshi.Builder().build();
    GetCSVHandler.GetCSVSuccessResponse response =
        moshi
            .adapter(GetCSVHandler.GetCSVSuccessResponse.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    GetCSVHandler.GetCSVSuccessResponse mock =
        new GetCSVHandler.GetCSVSuccessResponse("success", this.csvDatabase.getMostRecent());
    assertEquals(mock, response);
    clientConnection.disconnect();
  }

  /**
   * Testing a getcsv request and corresponding error response when a valid file has not been
   * successfully loaded
   *
   * @throws IOException
   */
  @Test
  public void testGetCSV() throws IOException {
    // mocking that load was not called -> database holds no current file
    URL requestURL = new URL("http://localhost:" + Spark.port() + "/" + "getcsv");
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
    clientConnection.connect();
    assertEquals(200, clientConnection.getResponseCode());
    Moshi moshi = new Moshi.Builder().build();
    ErrDatasourceResponse response =
        moshi
            .adapter(ErrDatasourceResponse.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    ErrDatasourceResponse mock = new ErrDatasourceResponse();
    assertEquals(mock.getClass(), response.getClass());
    clientConnection.disconnect();
  }

  /**
   * Testing a weather request and corresponding success respone with valid latitude and longitude
   * coordinates
   *
   * @throws IOException
   */
  @Test
  public void testValidCoordinates() throws IOException {
    URL requestURL =
        new URL("http://localhost:" + Spark.port() + "/" + "weather?lat=41.8268&lon=-71.4029");
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
    clientConnection.connect();
    assertEquals(200, clientConnection.getResponseCode());
    Moshi moshi = new Moshi.Builder().build();
    WeatherHandler.WeatherSuccessResponse response =
        moshi
            .adapter(WeatherHandler.WeatherSuccessResponse.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    WeatherHandler.WeatherSuccessResponse mock =
        new WeatherHandler.WeatherSuccessResponse(41.8268, -71.4029, 63);
    assertEquals(mock.getClass(), response.getClass());
    // mock record won't match actual response record because temperature is constantly being
    // updated in the NWS API
    clientConnection.disconnect();
  }

  /**
   * Testing a weather request and corresponding error response with invalid coordinates
   *
   * @throws IOException
   */
  @Test
  public void testInvalidCoordinates() throws IOException {
    URL requestURL = new URL("http://localhost:" + Spark.port() + "/" + "weather?lat=4448&lon=333");
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
    clientConnection.connect();
    assertEquals(200, clientConnection.getResponseCode());
    Moshi moshi = new Moshi.Builder().build();
    ErrBadJsonResponse response =
        moshi
            .adapter(ErrBadJsonResponse.class)
            .fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    ErrBadJsonResponse mock = new ErrBadJsonResponse();
    assertEquals(mock.getClass(), response.getClass());
    // mock record won't match actual response record because temperature is constantly being
    // updated in the NWS API
    clientConnection.disconnect();
  }
}
