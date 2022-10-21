
## **Project Details**

**Project Name**: Sprint 1 - Echo

**Estimated Time to Complete Project**: 12 hrs

**Link to repo can be found [here](https://github.com/cs0320-f2022/sprint-1-dtamesis-hlee171).**

## **Design Choices**
- "stats" will load the stats for the last correct get request. A get request and a stats request *do not* have to be consecutive for stats to be retrieved. This is because the global currentCSV variable stores the get request and only updates it when there is a new get request. We chose to do this because it would be annoying for a user to enter a typo and then have to redo their whole request. It is more user friendly this way and results in fewer errors messages being thrown, which is not fun for the user. 
- "stats" only works when it is entered as a singular command, not with anything following it 
- We have a button click and the enter functionality available for the user, because the enter button is commonly used 
- We have a very plain and undesigned page -- definitely more work could be put into the style, but we decided not to do this because our workload did not allow for it this week. 
### Relationships between classes/interfaces:
- index.html is the html file that manages the content of the page, including
the command prompt box and where the input/output history is stored. 
- main.css is where the style formatting occurs for index
- mockedJson.ts contains a variety of 2D arrays stored as strings, mocking the 
effect of a json file. These strings are mocks of short CSV files that are used
for testing, and are imported to main.ts
- main.ts stores all of the mock CSVs in a hashmap so that a string name is associated with the 2D array stored as a string. the main function is runInput, which does the bulk of the work in detecting whether the user wants to get a csv file or find the stats of the loaded csv file that they "got" previously. Depending on what is detected in the input, helper functions are called to print an output to the repl-history with the CSV file or the stats for the file. 

### Data structures: 
- String of 2D Arrays storing the mockedJson files  
- Hashmap with key (filename: string) to value (fake2DArray: string) so that we can demo the user getting a CSV file without including the back-end parser. 
### Runtime/Space Optimizations:
- [insert]
### Errors/Bugs: 
Experienced some errors with git, had to reclone instead of pulling because pulling
was not bringing all the changes over. May or may not affect gradescope submission, 
but all tests on local repo are now passing. If the tests do not pass on the gradescope
submission, this may be the source of error. 

### Tests: 
- Testing for button click counting 
- Testing for enter key counting
- Testing that our helper function can count the rows and columns of 2D array properly 
- Testing that entering a stats request before loading a CSV results in a prompting the user for a get request
- Testing that inputting a get request from the command box results in the correct array being loaded internally 
- Testing that entering a get request with improper formatting or entering an empty request results in the correct error message 
- Testing that entering stats request followed by additional strings results in the correct error message
- Testing that entering a typo between commands still allows for a valid stats request and provides stats for the most recent loaded CSV
- Testing that entering multiple get requests results in the most recent stats being outputted if the user requests stats, and that the internal variable only stores the most recent CSV

## **How to Run Tests & Build/Run the Program**
### Running Tests
- You can simply navigate to the project directory in the terminal (in this case, ```sprint-1-dtamesis-hlee171```), and run ```npm install``` to ensure you have the necessary dependencies to then run ```npm test``` in the command line.
### Building and Running the Program
- The HTML site can be opened using a live server.
- [insert about running commands]
- For User Story 1: 
- For example, ```get mockSimple``` would print the following on the page:
  ```
  Command: get mockSimple
  Output: mockSimple
  [["name", "age", "school"],
  ["amy", "22", "brown"],
  ["bob", "18", "harvard"], 
  ["cheng", "21", "boston college"], 
  ["duke benson", "19", "boston university"], 
  ["esther", "19", "notre dame"], 
  ["grace", "21", "university of southern california"]]`
  ```
  Following this, ```stats``` would print the following directly below the output above:
    ```
    Command: stats
    Output: Rows: 7, Columns: 3
    ```
