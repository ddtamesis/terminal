// all exports from main will now be available as main.X
import exp from 'constants';
import * as main from './main';
import { mockSimple, mockSomeEmptyStrings, 
    mockAllEmptyStrings, mockSmall, mockEmptyRows, mockNoRows} from './mockedJson.js';

/**
 * Tests whether submit button works and registers a click
 */
test('handleButtonClick counting', () => {
    expect(main.getClickCount()).toBe(0)
    main.handleButtonClick(new MouseEvent("click"))
    expect(main.getClickCount()).toBe(1)
    main.handleButtonClick(new MouseEvent("click"))
    expect(main.getClickCount()).toBe(2)
    main.handleButtonClick(new MouseEvent("click"))
    main.handleButtonClick(new MouseEvent("click"))
    expect(main.getClickCount()).toBe(4)
})

/**
 * Tests whether enter key registers
 */
test('handleEnterKey counting', () => {
    expect(main.getEnterCount()).toBe(0)
    main.handleKeyPress(new KeyboardEvent("keypress", {key: "Enter"}))
    expect(main.getEnterCount()).toBe(1)
    main.handleKeyPress(new KeyboardEvent("keypress", {key: "Enter"}))
    expect(main.getEnterCount()).toBe(2)
    main.handleKeyPress(new KeyboardEvent("keypress", {key: "Enter"}))
    main.handleKeyPress(new KeyboardEvent("keypress", {key: "Enter"}))
    expect(main.getEnterCount()).toBe(4)
})

/**
 * Tests that the correct stats are outputted for mock csv data
 */
 test('stats calculation', () => {
    expect(main.statsRequest(mockSimple)).toBe("Rows: 7, Columns: 3")
    expect(main.statsRequest(mockSomeEmptyStrings)).toBe("Rows: 7, Columns: 3")
    expect(main.statsRequest(mockAllEmptyStrings)).toBe("Rows: 5, Columns: 3")
    expect(main.statsRequest(mockSmall)).toBe("Rows: 1, Columns: 1")
    expect(main.statsRequest(mockEmptyRows)).toBe("Rows: 5, Columns: 0")
    expect(main.statsRequest(mockNoRows)).toBe("Rows: 0, Columns: 0")
})

/**
 * Tests that if you do not enter something in the command box and request stats
 * output prompts you to first load a csv file
 */
test('runInput: entering a stats request before getting csv', () => {
    var output; 
    output = main.runInput("stats"); 
    expect(output).toBe("You must first load a csv using 'get <csv-file>' to get the stats of that csv.")
    expect(main.getCurrentCSV).toBeUndefined;
})

/**
 * Tests whether the loaded data variable is updated according to the get command and if the correct output results from the given input
 */
test('runInput testing; updating loaded data variable', () => {
    var output = "";

    output = main.runInput("get mockSimple")
    expect(main.getCurrentCSV()).toBe(mockSimple)
    expect(output).toBe("mockSimple\n" + mockSimple)

    main.runInput("get mockSomeEmptyStrings")
    expect(main.getCurrentCSV()).toBe(mockSomeEmptyStrings)

    main.runInput("get mockAllEmptyStrings")
    expect(main.getCurrentCSV()).toBe(mockAllEmptyStrings)

    main.runInput("get mockSmall")
    expect(main.getCurrentCSV()).toBe(mockSmall)

    main.runInput("get mockEmptyRows")
    expect(main.getCurrentCSV()).toBe(mockEmptyRows)

    main.runInput("get mockNoRows")
    expect(main.getCurrentCSV()).toBe(mockNoRows)

    main.runInput("get wrongName")
    expect(main.getCurrentCSV()).toBeUndefined

    output = main.runInput("gibberish")
    expect(output).toBe("Command not recognized. Try 'get <csv-file>' to load the contents of the csv" 
    + " or 'stats' to get the numbers of rows and columns of the last loaded csv.")

})

/**
* Tests that an invalid get request prints out the right error message
 */


test('runInput: entering invalid or empty get request', () => {
    var output; 
    output = main.runInput("gethello"); 
    expect(output).toBe("Command not recognized. Try 'get <csv-file>' to load the contents of the csv" 
    + " or 'stats' to get the numbers of rows and columns of the last loaded csv."); 

    output = main.runInput("superdupercool"); 
    expect(output).toBe("Command not recognized. Try 'get <csv-file>' to load the contents of the csv" 
    + " or 'stats' to get the numbers of rows and columns of the last loaded csv."); 

    output = main.runInput(""); 
    expect(output).toBe("Command not recognized. Try 'get <csv-file>' to load the contents of the csv" 
    + " or 'stats' to get the numbers of rows and columns of the last loaded csv."); 

})

/**
* Tests that a stats request does not work with multiple words and prints out 
* the right error message
 */

test('runInput: entering invalid stats request', () => {
    var output; 
    output = main.runInput("stats mockSimple"); 
    expect(output).toBe("Command not recognized. Try 'get <csv-file>' to load the contents of the csv" 
    + " or 'stats' to get the numbers of rows and columns of the last loaded csv."); 

    output = main.runInput("stats mockNoRows"); 
    expect(output).toBe("Command not recognized. Try 'get <csv-file>' to load the contents of the csv" 
    + " or 'stats' to get the numbers of rows and columns of the last loaded csv."); 

    output = main.runInput("stats mockSomeEmptyStrings"); 
    expect(output).toBe("Command not recognized. Try 'get <csv-file>' to load the contents of the csv" 
    + " or 'stats' to get the numbers of rows and columns of the last loaded csv.");
    
    output = main.runInput("stats hi hi hi hi"); 
    expect(output).toBe("Command not recognized. Try 'get <csv-file>' to load the contents of the csv" 
    + " or 'stats' to get the numbers of rows and columns of the last loaded csv."); 

})

/**
* Tests that entering a typo between commands still allows for stats request
 */

test('runInput: entering typo between commands', () => {
    var output; 
    output = main.runInput("get mockSimple"); 
    output = main.runInput("user enters typo between commands")
    output = main.runInput("stats")
    expect(output).toBe("Rows: 7, Columns: 3")
    
})

/**
* Tests that entering multiple get requests only saves the most recent
 */

test('runInput: consecutive get requests results only saves most recent', () => {
    var output; 
    output = main.runInput("get mockSimple"); 
    output = main.runInput("get mockSomeEmptyStrings")
    output = main.runInput("get mockNoRows")
    output = main.runInput("stats")
    expect(main.getCurrentCSV()).toBe("[]")
    expect(output).toBe("Rows: 0, Columns: 0")
    
})
