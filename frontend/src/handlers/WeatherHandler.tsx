import { REPLFunction } from "../REPL";

/**
 * A REPLFunction which Returns a promise containing the weather output temperature, 
 * along with lat and lon values, if valid coordinates are entered.
 * Otherwise, returns promise containing an error message
 */
export let weatherHandler: REPLFunction = (args: Array<string>): Promise<string> => {
    // if the correct number of arguments are passed in, fetch request from backend server
    if (args.length === 2) {
        const lat: string = args[0];
        const lon: string = args[1];
        const promise: Promise<string> = fetch(`http://localhost:3232/weather?lat=${lat}&lon=${lon}`)
            .then(response => response.json())
            .then(r  => {
                if (r.result=== 'success') {
                    return r.temperature;
                } else {
                    // in this case, some error was thrown from the backend server
                    return 'Unable to retrieve the weather for those coordinates.'
                }
            })
        return promise;
    } else {
        return Promise.resolve('Invalid arguments. Please enter weather <lat> <lon>');
    }
}

/**
 * Mocks weather handler specifically for the input coordinates 
 * lat = 41.8268, lon = -71.4029 fixed to 40 degrees
 */
export let mockedWeatherHandler: REPLFunction = (args: Array<string>): Promise<string> => {
    if (args.length === 2) {
        if ((args[0] == "41.8268") && (args[1] == "-71.4029")) {
            return Promise.resolve("40")
        } else {
            return Promise.resolve('Unable to retrieve the weather for those coordinates.')
        }
    } else {
        return Promise.resolve('Invalid arguments. Please enter weather <lat> <lon>');
    }
}