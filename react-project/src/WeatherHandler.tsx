import { REPLFunction } from "./ReplFunctions";

/**
 * A REPLFunction which Returns a promise containing the weather output temperature, 
 * along with lat and lon values, if valid coordinates are entered.
 * Otherwise, returns promise containing an error message
 */
export let weatherHandler: REPLFunction = (args: Array<string>): Promise<string> => {
    // if the correct number of arguments are passed in, fetch request from backend server
    if (args.length == 2) {
        const lat: string = args[0];
        const lon: string = args[1];
        const promise: Promise<string> = fetch(`http://localhost:3232/weather?lat=${lat}&lon=${lon}`)
            .then(response => response.json())
            .then(r => {
                if (r.result === 'success') {
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