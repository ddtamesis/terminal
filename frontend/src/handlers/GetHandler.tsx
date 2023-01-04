import {REPLFunction} from "../REPL"
const URL = `http://localhost:3232/`


export let getHandler : REPLFunction;
let validStats = false;

/**
 * A REPLFunction which Returns a promise containing the csv contents specified by the user
 * assuming "get <valid csv filepath> is entered correctly"
 * Otherwise, returns promise containing an error message. 
 */
getHandler = function(args: Array<string>): Promise<string>  {
    return new Promise((resolve) => {
    
        if (args.length != 1) {
            resolve("Invalid number of arguments. Format as get <filepath>.")
        }
        else {
            const loadCSVURL : string = `${URL}loadcsv?filepath=${args[0]}`
            return fetch(loadCSVURL).then(response => response.json())
            .then(response => {
                if(response.result === "success") {
                    const getCSVURL = `${URL}getcsv`;
                    fetch(getCSVURL)
                         .then(r => r.json())
                            .then(response => {
                            if (response.result==="success") {
                                validStats = true;
                                return resolve(JSON.stringify(JSON.parse(JSON.stringify(response.data))));
                            }       
                                else {
                                    return resolve("Error retrieving csv contents.");
                                }
                            })
                } 
                else {
                    resolve("Unable to properly load file. Ensure the file path is valid.")
                }
        }).catch(e => resolve("Ensure csv is properly formatted."))
    }
}
    )
}


export let mockedGetHandler : REPLFunction;

/**
 * Mocked get handler for test-basic.csv 
 * unless command improperly formatted
 */
mockedGetHandler = function(args: Array<string>): Promise<string>  {
    if (args.length != 1) {
        return Promise.resolve("Invalid number of arguments. Format as get <filepath>.")
    } else if (args[0] === "data/testing/test-basic.csv") {
        const mockCSV: string = `[["Joe","12","Male"],["Sue","1","Female"],["Derek","17","Male"],["Quinn","20","Female"]]`
        return Promise.resolve(mockCSV);
    } else {
        return Promise.resolve("Unable to properly load file. Ensure the file path is valid.")
    }   
    }
