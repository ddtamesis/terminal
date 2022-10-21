package edu.brown.cs.student.stars;

import static org.junit.jupiter.api.Assertions.assertEquals;

import edu.brown.cs.student.csv.CSVParser;
import edu.brown.cs.student.csv.FactoryFailureException;
import java.io.IOException;
import java.io.StringReader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import org.junit.jupiter.api.Test;

public class FuzzTestCSVParser {

  static final int NUM_TRIALS = 1;
  static final int MAX_ROWS = 500;
  static final int MAX_COLS = 50;
  static final int MAX_WORD_LENGTH = 50;

  public String generateRandomCSV() {
    final ThreadLocalRandom r = ThreadLocalRandom.current();

    int numRows= r.nextInt(0, MAX_ROWS);
    int numCols = r.nextInt(0, MAX_COLS);

    String csv = "";
    for (int i = 0; i < numRows; i++) {
      String row = "";

      for (int j = 0; j < numCols; j++) {
        int wordLength = r.nextInt(0,MAX_WORD_LENGTH);
        byte[] bytes = new byte[wordLength];
        r.nextBytes(bytes);
        String word = new String(bytes, Charset.forName("UTF-8"));

        if (i == (numCols - 1)) {
          row += word;
        } else {
          row += word + ",";
        }
      }

      if (csv.isEmpty()) {
        csv = row;
      } else {
        csv += "\n" + row;
      }
    }
    return csv;
  }

  @Test
  public void fuzzTestCSV() throws IOException, FactoryFailureException {
    for (int counter = 0; counter < NUM_TRIALS; counter++) {
      String randomCSV = generateRandomCSV();
      CSVParser<List<List<String>>> csvParser = new CSVParser<>(new StringReader(randomCSV));
      assertEquals(true, csvParser.getParsedData() != null);
      System.out.println("Test " + (counter + 1) + " passed!");
    }
  }

}
