package edu.brown.cs.student.server;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs.student.datasource.Database;
import java.util.List;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Handler class for the getcsv endpoint. It takes a basic GET request with no Json body, and
 * returns a Json object in reply.
 */
public class GetCSVHandler implements Route {

  private Database<List<List<String>>> csvDatabase;

  /**
   * Constructor for GetCSVHandler
   *
   * @param csvDatabase - Database that keeps track of loaded files.
   */
  public GetCSVHandler(Database<List<List<String>>> csvDatabase) {
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
      if (this.csvDatabase.getMostRecent() == null) {
        return new ErrDatasourceResponse().serialize();
      }
      return new GetCSVSuccessResponse(this.csvDatabase.getMostRecent()).serialize();
    } catch (Exception e) {
      System.out.println("The following exception occurred: " + e.getMessage());
      e.printStackTrace();
      throw e;
    }
  }
  /** Response object to send, containing success notification and csv content */
  public record GetCSVSuccessResponse(String result, List<List<String>> data) {

    public GetCSVSuccessResponse(List<List<String>> csvContent) {
      this("success", csvContent);
    }

    /**
     * @return this response, serialized as Json
     */
    String serialize() {
      try {
        Moshi moshi = new Moshi.Builder().build();

        JsonAdapter<GetCSVHandler.GetCSVSuccessResponse> adapter =
            moshi.adapter(GetCSVSuccessResponse.class);
        return adapter.toJson(this);
      } catch (Exception e) {
        e.printStackTrace();
        throw e;
      }
    }
  }
}
