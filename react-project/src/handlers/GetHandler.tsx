import {REPLFunction} from "./REPLInterface"
const URL = `http://localhost:3232/`


export let getHandler : REPLFunction;

getHandler = function(args: Array<string>): Promise<string>  {
    return new Promise((resolve) => {
        if (args.length != 1) {
            resolve("Invalid number of arguments. Format as get <filepath>.")
        }
        else {
            const loadCSVURL = `${URL}loadcsv?filepath=${args[0]}`
            return fetch(loadCSVURL).then(response => response.json())
            .then(response => {
                if(response.result == "success") {
                    const getCSVURL = `${URL}getcsv`;
                    fetch(getCSVURL)
                         .then(r => r.json())
                            .then(response => {
                            if (response.result=="success") {
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
        })
    }
}
    )
}


    /*
    if (args.length != 1) {
        return Promise.resolve("Invalid number of arguments. Format as get <filepath>.");
    } else {
        const loadCSVURL = `${URL}loadcsv?filepath=${args[0]}`
        const promise: Promise<string> = fetch(loadCSVURL)
            .then(response => response.json())
            .then(r => {
                if (r.result === "success") {
                    const getCSVURL = `${URL}getcsv`;
                    fetch(getCSVURL)
                    .then(response => response.json())
                    .then(r => {
                        const csvContent: string | undefined = JSON.stringify(JSON.parse(JSON.stringify(r.data)))
                        if (r.result != "success") {
                            return "Error retrieving csv contents.";
                        } else if (csvContent == undefined) {
                            return "Error retrieving csv contents.";
                        } else {
                            return csvContent;
                        }
                    })
                } else {
                    return "Unable to properly load file. Ensure the file path is valid.";
                }
            })
        return promise;
    } */
