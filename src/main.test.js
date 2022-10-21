import * as main from './main';
import { mockSimple, mockSomeEmptyStrings, mockAllEmptyStrings, mockSmall, mockEmptyRows, mockNoRows } from './mockedJson.js';
/**
 * Tests whether submit button works and registers a click
 */
test('handleButtonClick counting', function () {
    expect(main.getClickCount()).toBe(0);
    main.handleButtonClick(new MouseEvent("click"));
    expect(main.getClickCount()).toBe(1);
    main.handleButtonClick(new MouseEvent("click"));
    expect(main.getClickCount()).toBe(2);
    main.handleButtonClick(new MouseEvent("click"));
    main.handleButtonClick(new MouseEvent("click"));
    expect(main.getClickCount()).toBe(4);
});
/**
 * Tests whether enter key registers
 */
test('handleEnterKey counting', function () {
    expect(main.getEnterCount()).toBe(0);
    main.handleKeyPress(new KeyboardEvent("keypress", { key: "Enter" }));
    expect(main.getEnterCount()).toBe(1);
    main.handleKeyPress(new KeyboardEvent("keypress", { key: "Enter" }));
    expect(main.getEnterCount()).toBe(2);
    main.handleKeyPress(new KeyboardEvent("keypress", { key: "Enter" }));
    main.handleKeyPress(new KeyboardEvent("keypress", { key: "Enter" }));
    expect(main.getEnterCount()).toBe(4);
});
/**
 * Tests that the correct stats are outputted for mock csv data
 */
test('stats calculation', function () {
    expect(main.statsRequest(mockSimple)).toBe("Rows: 7, Columns: 3");
    expect(main.statsRequest(mockSomeEmptyStrings)).toBe("Rows: 7, Columns: 3");
    expect(main.statsRequest(mockAllEmptyStrings)).toBe("Rows: 5, Columns: 3");
    expect(main.statsRequest(mockSmall)).toBe("Rows: 1, Columns: 1");
    expect(main.statsRequest(mockEmptyRows)).toBe("Rows: 5, Columns: 0");
    expect(main.statsRequest(mockNoRows)).toBe("Rows: 0, Columns: 0");
});
/**
 * Tests whether the loaded data variable is updated according to the get command and if the correct output results from the given input
 */
test('runInput testing; updating loaded data variable', function () {
    var output = "";
    output = main.runInput("get mockSimple");
    expect(main.getCurrentCSV()).toBe(mockSimple);
    expect(output).toBe("mockSimple\n" + mockSimple);
    // TODO: finish the rest
    main.runInput("get mockSomeEmptyStrings");
    expect(main.getCurrentCSV()).toBe(mockSomeEmptyStrings);
    main.runInput("get mockAllEmptyStrings");
    expect(main.getCurrentCSV()).toBe(mockAllEmptyStrings);
    main.runInput("get mockSmall");
    expect(main.getCurrentCSV()).toBe(mockSmall);
    main.runInput("get mockEmptyRows");
    expect(main.getCurrentCSV()).toBe(mockEmptyRows);
    main.runInput("get mockNoRows");
    expect(main.getCurrentCSV()).toBe(mockNoRows);
    main.runInput("get wrongName");
    expect(main.getCurrentCSV()).toBeUndefined;
    output = main.runInput("gibberish");
    expect(output).toBe("Command not recognized. Try 'get <csv-file>' to load the contents of the csv"
        + " or 'stats' to get the numbers of rows and columns of the last loaded csv.");
    // TODO: test other command cases (e.g. if stats is called w/o loading csv, etc.)
});
/**
 * Tests whether certain incorrect inputs output the appropriate informative error message
 */
test('runInputTesting; error outputs', function () {
});
// TODO: think of other tests?
// TODO: README
