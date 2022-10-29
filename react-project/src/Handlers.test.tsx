import React from 'react';
import { render, screen } from '@testing-library/react';
import REPL, { TEXT_input_box_accessible_name, TEXT_input_text_accessible_name, 
    TEXT_submit_button_accessible_name, TEXT_submit_button_text, TEXT_input_button_accessible_name,
     TEXT_input_output_pair_accessible_name } from './REPL';
import userEvent from '@testing-library/user-event';
import {getHandler} from "./handlers/GetHandler";
import {weatherHandler} from './handlers/WeatherHandler';
import {statsHandler} from './handlers/StatsHandler';


/**
 * Running our unit tests for each of our handler functions. Find integration testing all in REPL.test. 
 * 
 */


/**
 * Checks that get doesn't work with too few arguments
 */
test("get doesn't work with too few arguments", async () => {
    let promiseObj : Promise<string> = getHandler([])
    return promiseObj.then((response: String) => expect(response).toBe("Invalid number of arguments. Format as get <filepath>."))
}
)

/**
 * Checks that get doesn't work with too many arguments
 */
test("get doesn't work with too many arguments", async () => {
    let promiseObj : Promise<string> = getHandler(["file1", "file2"])
    return promiseObj.then((response: String) => expect(response).toBe("Invalid number of arguments. Format as get <filepath>."))
}
)

/**
 * Checks that get doesn't work with invalid csv 
 */
test("get doesn't work with invalid csv", async () => {
    let promiseObj : Promise<string> = getHandler(["data/testing/test-invalid.csv"])
    return promiseObj.then((response: String) => expect(response).toBe("Unable to properly load file. Ensure the file path is valid."))
}
)


/**
 * Checks that get works as expected with valid csv 
 */
 test("get works with valid csv", async () => {
    let promiseObj : Promise<string> = getHandler(["data/testing/test-basic.csv"])
    return promiseObj.then((response: String) => expect(response).toBe(`[[\"Joe\",\"12\",\"Male\"],[\"Sue\",\"1\",\"Female\"],[\"Derek\",\"17\",\"Male\"],[\"Quinn\",\"20\",\"Female\"]]`))
}
 )


/**
 * Checks that get doesn't work with csv file that doesn't exist 
 */
 test("get doesn't work with csv file that doesn't exist", async () => {
    let promiseObj : Promise<string> = getHandler(["data/testing/notExist"])
    return promiseObj.then((response: String) => expect(response).toBe("Unable to properly load file. Ensure the file path is valid."))
 }
)



/**
 * Tests that the correct stats are outputted for csv data 
 */
 test("correct stats returned", async () => {
    let promiseObjGet : Promise<string> = getHandler(["data/testing/test-basic.csv"])
    return promiseObjGet.then((response: String) => response)
    .then(() => statsHandler([])).then((response: String) => expect(response).toBe("Rows: 4, Columns: 3"))
 }
)


/** 
 * Tests that stats correctly updates once you get another csv
 */
 test("correct stats returned after updating get", async () => {
   let promiseObjGet : Promise<string> = getHandler(["data/testing/test-basic.csv"])

   return promiseObjGet.then((response: String) => response)
   .then(() => getHandler(["data/testing/test-empty.csv"]))
   .then(() => statsHandler([])).then((response: String) => expect(response).toBe("Rows: 0, Columns: 0"))
}
)



/**
 * Tests that stats doesn't work with too many arguments 
 */

 test("stats doesn't work with too many arguments", async () => {
    let promiseObjStats : Promise<string> = statsHandler(["ok"])
    return promiseObjStats.then((response: String) => expect(response).toBe("Invalid arguments. Please only enter 'stats'"))
 }
)



/**
 * Tests that weather doesn't work with too few arguments
 */

/**
 * Tests that stats doesn't work with too few arguments 
 */

 test("weather doesn't work with too few arguments", async () => {
    let promiseObjWeather : Promise<string> = weatherHandler(["41.8268"])
    return promiseObjWeather.then((response: String) => expect(response).toBe("Invalid arguments. Please enter weather <lat> <lon>"))
}
)

/**
 * Tests that weather doesn't work with too many arguments
 */

 test("weather doesn't work with too many arguments", async () => {
    let promiseObjWeather : Promise<string> = weatherHandler(["41.8268", "-71.4029", "extra"])
    return promiseObjWeather.then((response: String) => expect(response).toBe("Invalid arguments. Please enter weather <lat> <lon>"))
}
)

/**
 * Tests that weather works correctly with correct input
 */

 test("weather works with correct input", async () => {
    let promiseObjWeather : Promise<string> = weatherHandler(["41.8268", "-71.4029"])
    return promiseObjWeather.then((response: String) => expect(response).toBe(58))
})


/**
 * Tests that weather outputs informative message with invalid coordinates
 */

 test("weather doesn't break for invalid coordinates", async () => {
    let promiseObjWeather : Promise<string> = weatherHandler(["-200", "--5"])
    return promiseObjWeather.then((response: String) => expect(response).toBe("Unable to retrieve the weather for those coordinates."))
})
