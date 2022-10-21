import { isArrayLiteralExpression, NonNullChain, OutputFileType } from "typescript"
import { mockSimple, mockSomeEmptyStrings, 
    mockAllEmptyStrings, mockSmall, mockEmptyRows, mockNoRows} from './mockedJson.js';

// create map to store mock csvs according to their name for easy retrieval
let mockDatabase = new Map<string, string>();
mockDatabase.set("mockSimple", mockSimple);
mockDatabase.set("mockSomeEmptyStrings", mockSomeEmptyStrings);
mockDatabase.set("mockAllEmptyStrings", mockAllEmptyStrings);
mockDatabase.set("mockSmall", mockSmall);
mockDatabase.set("mockEmptyRows", mockEmptyRows);
mockDatabase.set("mockNoRows", mockNoRows);

// Store the most recently loaded csv and name to process future stats command
let currentCSV: string | undefined = undefined;
let currentFileName: string = "";

/**
 * Gets the current csv
 */
 function getCurrentCSV() {
    return currentCSV;
}

/**
 * Sets the current csv
 * 
 * @param csv - the latest csv loaded
 */
function setCurrentCSV(csv: string) {
    currentCSV = csv;
}

// prepare submit button and enter key responses
window.onload = () => {    
    prepareButtonClick();
    prepareKeyPress();
}

/**
 * Adds an event listener to prepare the program for handling a button click
 */
function prepareButtonClick() {
    const submitButton: HTMLElement | null = document.getElementById("submit-button");

    if (submitButton == null) {
        console.log("Couldn't find button!");
    } else if (!(submitButton instanceof HTMLButtonElement)) {
        console.log(`Found element ${submitButton}, but it wasn't a button!`);
    } else {
        submitButton.addEventListener("click", handleButtonClick);
    }
}

/**
 * Adds an event listener to prepare the program for responding to pressing a key
 */
 function prepareKeyPress() {
    document.addEventListener("keypress", handleKeyPress);
}

// store click count for testing
let clickCount = 0;
function getClickCount() {
    return clickCount;
}

/**
 * Submits and processes input upon clicking the submit button
 * 
 * @param event - represents a click
 */
function handleButtonClick(event: MouseEvent) {
    clickCount ++;
    submit();
}

// store enter press count for testing
let enterCount = 0;
function getEnterCount() {
    return enterCount;
}

/**
 * Submits and processes input upon pressing the enter key
 */
function handleKeyPress(event: KeyboardEvent) {
    if (event.key == "Enter") {
        enterCount++;
        submit();
    }   
}

/**
 * Handles a submission by getting the input text and running the input command
 */
function submit() {
    const input: HTMLElement | null = document.getElementById('input');

    if (input == null) {
        console.log("Couldn't find input!");
    } else if (!(input instanceof HTMLInputElement)) {
        console.log(`Found element ${input}, but it wasn't an input!`);
    } else {
        const inputString = input.value;
        runInput(inputString);
        input.value = ""; // resets input command box so user doesn't have to delete previous entry
    }
}

/**
 * Processes the input command string and outputs appropriate result of calling the command
 * 
 * @param input - represents the input text into the command box
 */
function runInput(input: string) {
    var output: string = ""; // output to be updated according to the command
    const inputArgs = input.split(' '); // split input args array separated by spaces
    const command = inputArgs[0]; // get first word from the input
    
    // process command and prepare output
    if (command === 'get') {
        const inputFileName = inputArgs[1];
        currentFileName = inputFileName;
        output = getRequest(inputFileName);
    } else if (command === 'stats' && inputArgs.length === 1) {
        if (currentCSV == undefined) {
            output = "You must first load a csv using 'get <csv-file>' to get the stats of that csv.";
        } else {
            output = statsRequest(currentCSV);
        }
    } else {
        output = "Command not recognized. Try 'get <csv-file>' to load the contents of the csv" 
            + " or 'stats' to get the numbers of rows and columns of the last loaded csv.";
    }

    // print command and output to repl-history
    const history: Element | null = document.getElementsByClassName("repl-history").item(0)
    if (history == null) {
        console.log("REPL History could not be found!")
    } else {
        displayHistory(input, output)
    }
    return output; // for testing command outputs
    
}

/**
 * Processes the get command and returns the csv contents to output
 * 
 * @param fileName - the name of the csv to be outputed
 * @returns the csv name, followed by the csv content to be outputted
 */
function getRequest(fileName: string) {
    if (mockDatabase.has(fileName)) {
        currentCSV = mockDatabase.get(fileName);
        return fileName + "\n" + currentCSV;
    } else {
        return "There is no registered file for the file name you entered!";
    }
}

/**
 * Processes the stats command and returns the row and column count to be outputted
 * 
 * @param str - the csv contents to be calculating stats for
 * @returns the string output with row and column counts
 */
function statsRequest(str: string) {
    const array = JSON.parse(str); // parses a JSON string into an array
    const rows = array.length; 
    var cols = 0; 
    if (array.length != 0) {
        cols = array[0].length;
    }
    return "Rows: " + rows + ", Columns: " + cols;
}

/**
 * Adds p elements to the REPL history to house the command and output text
 * 
 * @param command - the command to be printed
 * @param output - the output to be printed
 */
function displayHistory(command: string, output: string) {
    const history: Element | null = document.getElementsByClassName("repl-history").item(0)

    if (history == null) {
        console.log("REPL History could not be found!")
    } else {
        const commandText = document.createElement("p")
        commandText.innerText = "Command: " + command; 
        history.appendChild(commandText)

        const outputText = document.createElement("p")
        outputText.innerText = "Output: " + output
        history.appendChild(outputText)
    }
}




export {prepareButtonClick, prepareKeyPress, handleButtonClick, handleKeyPress, 
    getClickCount, getEnterCount, submit, runInput, getRequest, statsRequest, 
    displayHistory, getCurrentCSV, setCurrentCSV}
