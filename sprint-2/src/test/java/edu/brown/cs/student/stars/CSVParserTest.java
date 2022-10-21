package edu.brown.cs.student.stars;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import edu.brown.cs.student.csv.CSVParser;
import edu.brown.cs.student.csv.FactoryFailureException;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;

public class CSVParserTest {

  private Reader testFileReader;
  private CSVParser testParser;

  /** Sets the testParser for the basic csv case. */
  public void setBasicCase() throws IOException, FactoryFailureException {
    try {
      this.testFileReader = new FileReader("data/testing/test-basic.csv");
    } catch (FileNotFoundException e) {
      throw new RuntimeException(e);
    }
    this.testParser = new CSVParser(this.testFileReader);
  }

  /** Sets the testParser for the empty csv case. */
  public void setEmptyCase() throws IOException, FactoryFailureException {
    try {
      this.testFileReader = new FileReader("data/testing/test-empty.csv");
    } catch (FileNotFoundException e) {
      throw new RuntimeException(e);
    }
    this.testParser = new CSVParser(this.testFileReader);
  }

  /**
   * Sets the testParser for the missing fields csv case, where some rows may have missing fields.
   */
  public void setMissingFieldsCase() throws IOException, FactoryFailureException {
    try {
      this.testFileReader = new FileReader("data/testing/test-missing-fields.csv");
    } catch (FileNotFoundException e) {
      throw new RuntimeException(e);
    }
    this.testParser = new CSVParser(this.testFileReader);
  }

  /**
   * Sets the testParser for the case where some values may have spaces (e.g. first and last names).
   */
  public void setWithSpacesCase() throws IOException, FactoryFailureException {
    try {
      this.testFileReader = new FileReader("data/testing/test-with-spaces.csv");
    } catch (FileNotFoundException e) {
      throw new RuntimeException(e);
    }
    this.testParser = new CSVParser(this.testFileReader);
  }

  /** Sets the testParser with a StringReader as input to the constructor. */
  public void setTestParserStringReader() throws IOException, FactoryFailureException {
    StringReader sr =
        new StringReader(
            """
        Name,Age,Sex
        Joe,12,Male
        Sue,1,Female
        Derek,17,Male
        Quinn,20,Female""");
    this.testParser = new CSVParser<>(sr);
  }

  /** Sets the testParser with a StarFactory as a second input to the constructor. */
  public void setWithStarCreator() throws IOException, FactoryFailureException {
    try {
      this.testFileReader = new FileReader("data/stars/ten-star.csv");
    } catch (FileNotFoundException e) {
      throw new RuntimeException(e);
    }
    this.testParser = new CSVParser<>(this.testFileReader, new StarFactory());
  }

  /**
   * Tests the expected parsed data, counter values, and column titles on the basic csv test file.
   */
  @Test
  public void testBasicCase() throws IOException, FactoryFailureException {
    setBasicCase();

    ArrayList<List<String>> expectedData = new ArrayList<>();
    expectedData.add(List.of("Joe", "12", "Male"));
    expectedData.add(List.of("Sue", "1", "Female"));
    expectedData.add(List.of("Derek", "17", "Male"));
    expectedData.add(List.of("Quinn", "20", "Female"));
    assertEquals(expectedData, this.testParser.getParsedData());

    assertEquals(12, this.testParser.getWordCount());
    assertEquals(43, this.testParser.getCharCount());
    assertEquals(4, this.testParser.getRowCount());
    assertEquals(3, this.testParser.getColumnCount());

    String[] expectedColumns = new String[] {"Name", "Age", "Sex"};
    assertArrayEquals(expectedColumns, this.testParser.getColumnTitles());
  }

  /**
   * Tests the expected parsed data, counter values, and column titles on the empty csv test file.
   */
  @Test
  public void testEmptyCase() throws IOException, FactoryFailureException {
    setEmptyCase();
    ArrayList<List<String>> expected = new ArrayList<>();

    assertEquals(expected, this.testParser.getParsedData());
    assertEquals(0, this.testParser.getWordCount());
    assertEquals(0, this.testParser.getCharCount());
    assertEquals(0, this.testParser.getRowCount());
    assertEquals(0, this.testParser.getColumnCount());

    String[] expectedColumns = new String[] {};
    assertArrayEquals(expectedColumns, this.testParser.getColumnTitles());
  }

  /**
   * Tests the expected parsed data, counter values, and column titles on the csv test file with
   * missing fields.
   */
  @Test
  public void testMissingFieldsCase() throws IOException, FactoryFailureException {
    setMissingFieldsCase();

    ArrayList<List<String>> expectedData = new ArrayList<>();
    expectedData.add(List.of("Joe", "12", "Male"));
    expectedData.add(List.of("", "1", "Female"));
    expectedData.add(List.of("Derek", "", "Male"));
    expectedData.add(List.of("Quinn", "20", "Female"));
    assertEquals(expectedData, this.testParser.getParsedData());

    assertEquals(10, this.testParser.getWordCount());
    assertEquals(38, this.testParser.getCharCount());
    assertEquals(4, this.testParser.getRowCount());
    assertEquals(3, this.testParser.getColumnCount());
  }

  /**
   * Tests the expected parsed data, counter values, and column titles on the csv test file with
   * spaces.
   */
  @Test
  public void testWithSpacesCase() throws IOException, FactoryFailureException {
    setWithSpacesCase();

    ArrayList<List<String>> expectedData = new ArrayList<>();
    expectedData.add(List.of("Joe Anderson", "12", "Male"));
    expectedData.add(List.of("Sue", "1", "Female"));
    expectedData.add(List.of("Derek Smith", "17", "Male"));
    expectedData.add(List.of("Quinn", "20", "Female"));
    assertEquals(expectedData, this.testParser.getParsedData());

    assertEquals(14, this.testParser.getWordCount());
    assertEquals(56, this.testParser.getCharCount());
    assertEquals(4, this.testParser.getRowCount());
    assertEquals(3, this.testParser.getColumnCount());

    String[] expectedColumns = new String[] {"Name", "Age", "Sex"};
    assertArrayEquals(expectedColumns, this.testParser.getColumnTitles());
  }

  /**
   * Tests the expected parsed data, counter values, and column titles from a StringReader input.
   */
  @Test
  public void testStringReaderCase() throws IOException, FactoryFailureException {
    setTestParserStringReader();

    ArrayList<List<String>> expectedData = new ArrayList<>();
    expectedData.add(List.of("Joe", "12", "Male"));
    expectedData.add(List.of("Sue", "1", "Female"));
    expectedData.add(List.of("Derek", "17", "Male"));
    expectedData.add(List.of("Quinn", "20", "Female"));
    assertEquals(expectedData, this.testParser.getParsedData());

    assertEquals(12, this.testParser.getWordCount());
    assertEquals(43, this.testParser.getCharCount());
    assertEquals(4, this.testParser.getRowCount());
    assertEquals(3, this.testParser.getColumnCount());

    String[] expectedColumns = new String[] {"Name", "Age", "Sex"};
    assertArrayEquals(expectedColumns, this.testParser.getColumnTitles());
  }

  /**
   * Tests the expected parsed data, counter values, and column titles with StarFactory creator
   * input.
   */
  @Test
  public void testStarsCase() throws IOException, FactoryFailureException {
    setWithStarCreator();

    ArrayList<Star> expectedData = new ArrayList<>();
    expectedData.add(new Star(0, "Sol", 0.0, 0.0, 0.0));
    expectedData.add(new Star(1, "", 282.43485, 0.00449, 5.36884));
    expectedData.add(new Star(2, "", 43.04329, 0.00285, -15.24144));
    expectedData.add(new Star(3, "", 277.11358, 0.02422, 223.27753));
    expectedData.add(new Star(3759, "96 G. Psc", 7.26388, 1.55643, 0.68697));
    expectedData.add(new Star(70667, "Proxima Centauri", -0.47175, -0.36132, -1.15037));
    expectedData.add(new Star(71454, "Rigel Kentaurus B", -0.50359, -0.42128, -1.1767));
    expectedData.add(new Star(71457, "Rigel Kentaurus A", -0.50362, -0.42139, -1.17665));
    expectedData.add(new Star(87666, "Barnard's Star", -0.01729, -1.81533, 0.14824));
    expectedData.add(new Star(118721, "", -2.28262, 0.64697, 0.29354));
    assertEquals(expectedData, this.testParser.getParsedData());

    assertEquals(54, this.testParser.getWordCount());
    assertEquals(314, this.testParser.getCharCount());
    assertEquals(10, this.testParser.getRowCount());
    assertEquals(5, this.testParser.getColumnCount());

    String[] expectedColumns = new String[] {"StarID", "ProperName", "X", "Y", "Z"};
    assertArrayEquals(expectedColumns, this.testParser.getColumnTitles());
  }

  /** Testing exceptions */
  @Test
  public void testExceptions() {
    assertThrows(IOException.class, () -> new CSVParser<>(new FileReader("phone-numbers.csv")));
    assertThrows(
        FactoryFailureException.class,
        () -> new CSVParser<>(new FileReader("data/testing/test-basic.csv"), new StarFactory()));
  }
}
