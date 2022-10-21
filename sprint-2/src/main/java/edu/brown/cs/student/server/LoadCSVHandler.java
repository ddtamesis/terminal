package edu.brown.cs.student.server;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.csv.CSVParser;
import edu.brown.cs.student.datasource.Database;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.List;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Handler class for the loadcsv endpoint. It takes a basic GET request with no Json body, and
 * returns a Json object in reply.
 */
public class LoadCSVHandler implements Route {

  private Database<List<List<String>>> csvDatabase;

  /**
   * Constructor for LoadCSVHandler
   *
   * @param csvDatabase - Database that keeps track of loaded files.
   */
  public LoadCSVHandler(Database<List<List<String>>> csvDatabase) {
    this.csvDatabase = csvDatabase;
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
      String currFilePath = request.queryParams("filepath");

      // returns bad request response if the filepath is empty or missing
      if (currFilePath == null) {
        return new ErrBadRequestResponse().serialize();
      }
      if (currFilePath.isEmpty()) {
        return new ErrBadRequestResponse().serialize();
      }
      if (!currFilePath.startsWith("data/")) {
        return new ErrDatasourceResponse().serialize();
      }

      CSVParser<List<String>> csvParser = new CSVParser<>(new FileReader(currFilePath));
      this.csvDatabase.setParser(csvParser);
      this.csvDatabase.loadFile(currFilePath);

      return new LoadCSVSuccessResponse(currFilePath).serialize();
    } catch (FileNotFoundException e) {
      // returns datasource error if file cannot be found
      return new ErrDatasourceResponse().serialize();
    } catch (Exception e) {
      System.out.println("The following exception occurred: " + e.getMessage());
      e.printStackTrace();
      throw e;
    }
  }

  /** Response object to send, containing success notification */
  public record LoadCSVSuccessResponse(String result, String filepath) {

    public LoadCSVSuccessResponse(String filepath) {
      this("success", filepath);
    }

    /**
     * @return this response, serialized as Json
     */
    String serialize() {
      try {
        Moshi moshi = new Moshi.Builder().build();
        return moshi.adapter(LoadCSVSuccessResponse.class).toJson(this);
      } catch (Exception e) {
        e.printStackTrace();
        throw e;
      }
    }
  }
}
