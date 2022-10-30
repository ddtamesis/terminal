# sprint-3-dtamesis-mtahir1
dtamesis-mtahir1 team's sprint-3 repo

## **Project Details**

**Project Name**: Sprint 3 - Terminal 

**Estimated Time to Complete Project**: 20 hrs 

**Link to repo can be found [here](https://github.com/orgs/cs0320-f2022/teams/dtamesis-mtahir1).**

## **Design Choices**
### Relationships between classes/interfaces:
- Each ```Handler``` function implements the ```REPLFunctionInterface```, which is a command-processor function for our 
```REPL``` that defines how the values the user inputted will be executed to history. Our ```REPLFunctionInterface```
ensures each handler returns a string wrapped in a promise (```Promise<string>```). This ```Promise``` is then used to create a command/output pair component to be added to the command history on the page. 
- App.tsx, the parent component function for our application, includes REPL as its primary component. REPL.tsx has REPL as its primary function, which defines the logic/display for our application as a whole, breaking it up into different functional components: each logged command/output 
pair is represented by the UpdateHistory Component, and the input box/submit button logic/display is handled by the newCommand component. 
- A developer can add their own commands to the command dictionary as long as they provide a ```Handler``` that implements our ```REPLFunctionInterface```.

### Data structures: 
- From the frontend: The ```handlers``` package houses the commands we define for our terminal: ```get```, ```stats```, and ```weather```. These are then imported by our ```REPL``` component file and added to the command dictionary to be referenced by the ```REPL```. Again, note that a developer can easily expand upon this command dictionary by implementing their own handlers, as long as they implement the ```REPLFunctionInterface```.
- From the backend: Our ```Database``` class keeps track of the loaded files and parsing their contents. We designed this class to adhere to User Story 3, specifically adding a new datasource. Its ```setParser()``` method allows developers to specifiy which parser object should be used to parse their file data. The ```loadFile()``` method parses the data provided by the user inputted filepath. It then adds the filepath and its parsed contents to the HashMap field, database. In our ```Server```, we instantiate a ```Database``` to act as a shared state between ```LoadCSVHandler``` and ```GetCSVHandler```. When a user requests the ```loadcsv``` endpoint, it's handled using ```LoadCSVHandler``` where ```csvDatabase.setParser()``` and ```csvDatabase.loadFile()``` are called. If the user then requests the ```getcsv``` endpoint, it's handled using ```GetCSVHandler``` where the contents of the most recent file are obtained by calling ```csvDatabase.getMostRecent()```. 
### Runtime/Space Optimizations:
To minimize the runtime complexity of our program, we utilize a HashMap() to retrieve the parsed contents of the most recently loaded file in constant time. This is handled in the backend component of our code, which doesn't directly relate to this project. 

### Errors/Bugs: 
None
### Tests: 
- Unit Testing: 
  - We used unit testing to test the functionality of our CSVParser, created during Sprint 0, in the ```CSVParserTest``` class.
  - We also used unit testing to test the functionality of our weather API utilities in our ```TestWeatherAPIUtilities``` class.
  - The ```WeatherAPIUltilities``` class contains utility methods for handling weather request objects regardless of the external NWS API.
  - In our frontend implementation, we perform unit tests for the three commands featured in our terminal.
- Integration Testing:
  - For our backend, we felt that integration testing provided an ideal avenue to test the overall functionality of sending API requests to a server and outputting the correct responses. In our TestAPIHandlers class, we set up a Spark server and get requests for each of our handlers (```LoadCSVHandler```, ```GetCSVHandler```, and ```WeatherHandler```). Each individual test method set up a HTTPConnection with an URL that tests a specific endpoint. We used assertEquals() to determine if an okay connection was established. We then used moshi to create a response to the URL. The integration test is a success if a Json response is generated without causing any errors. We also used ```assertEquals()``` to test if the type of Json response matches what we expected it to be. In our ```FuzzTestWeather``` class, we perform fuzz testing of our weather handler by randomly generating coordinates that span the contiental United States.
  - For our front end, we use the React Testing Library (RTL) to test the dynamic updates of our terminal. We test that the appropriate HTMLElements are updated in the document according to various user interactions.

## **How to Run Tests & Build/Run the Program**
### Running Tests
- For the backend tests, using Maven, you can simply navigate to the project directory in the terminal (in this case, ```backend```), and run ```mvn test``` in the command line.
- For the frontend tests, it is essential that you run the backend server prior to running our tests. Our preferred method is to run the ```Server.main()``` method in ```IntelliJ``` to start the server. Afterwards, you may navigate to the ```frontend``` directory, and run ```npm test``` in the command line. Note: You may have to install the package dependencies prior to running the tests if you do not see a ```node_modules``` directory. To do this, run ```npm install``` in the command line prior to ```npm test```. 
### Building and Running the Program
- Remember that it is essential to run the backend server prior to running the frontend. Again, our preferred method is to run the ```Server.main()``` method in ```IntelliJ``` to start the server. 
- Then, navigate to the ```frontend``` directory and run ```npm start``` to build and run the terminal in a web browser.
- The ```get``` command will return the contents of a csv file, given a ```filepath``` argument. Submit ```get <csvfilepath>``` in the command input box to get the contents.
  - Note: For security purposes, our program limits access to contents within the ```data``` folder of the ```backend``` directory. Thus, your file path should start with ```data```.
- The ```stats``` command outputs the number of rows and columns of the most recently loaded csv file. You must submit a successful get command before submitting this command.
  - Note: Our terminal stores the most recently loaded csv to calculate the stats, so if you submit a successful ```get``` command, followed by an unsuccessful ```get command``` or some other command, a subsequent ```stats``` request will output the stats of the most recent successfully loaded csv file.
- The ```weather``` command outputs the current temperature at a given location in the United States, given the latitude and longitude coordinates. This would look like: ```weather <lat> <lon>```. Note that the National Weather Service (NWS) API used to handle this request cannot handle coordinates with more precision than 4 decimal points.
