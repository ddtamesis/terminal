import {REPLFunction} from "./REPLInterface"
const URL = `http://localhost:3232/`

export let statsHandler : REPLFunction;

/**
 * A REPLFunction which Returns a promise containing the stats content (row/column count), 
 * assuming the correct command is entered i.e 'stats'. 
 * Otherwise, returns promise containing an error message
 */
statsHandler = function(args: Array<string>): Promise<string>  {
    if (args.length === 0) {
        const getCSVURL = `${URL}getcsv`;
        const promise: Promise<string> = fetch(getCSVURL)
        .then(response => response.json())
        .then(r => {
            if (r.result === "success") {
                if(r.data.length !== 0) {
                    return  "Rows: " + r.data.length.toString() + ", Columns: " + r.data[0].length.toString();
                } 
                else {
                    return "Rows: 0, Columns: 0"
                }
            } else {
                return "Unable to retrieve csv file. Enter get <filepath> to store csv in system prior to calculating stats"
            }
        })
        return promise;

    } else {
        return Promise.resolve("Invalid arguments. Please only enter 'stats'")
    }
}
