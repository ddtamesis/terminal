const URL = `http://localhost:3232/`
const CSVDirectory_Musa = "/Users/musatahir/cs32/sprint-3-dtamesis-mtahir1/sprint-2/data";
const CSVDirectory_Dani = "/Users/kaka/cs32/sprint-3-dtamesis-mtahir1/sprint-2/data";


/**
 * A command-processor function for our REPL. The function returns a Promise   
 * which resolves to a string, which is the value to print to history when 
 * the command is done executing.
 * 
 * The arguments passed in the input (which need not be named "args") should 
 * *NOT*contain the command-name prefix. 
 */
 export interface REPLFunction {    
    (args: Array<string>): Promise<string>
}

export let getCommand : REPLFunction;

getCommand = function(args: Array<string>): Promise<string>  {

    return new Promise((resolve) => {
        if (args.length != 1) {
            resolve("Invalid number of arguments. Format as get <filepath>.")
        }

        else {
            const loadCSVURL = `${URL}loadCSV?filepath=${CSVDirectory_Musa}${args[0]}`
            return fetch(loadCSVURL).then(response => response.json())
            .then(response => {
                if(response.result == "success") {
                    const getCSVURL = `${URL}getCSV`;
                    fetch(getCSVURL)
                        .then(r => r.json())
                            .then(response => {
                                if (response.result=="success") {
                                    resolve(JSON.stringify(JSON.parse(JSON.stringify(response.csvContent))));
                                } 
                                else {
                                    resolve("Error retrieving csv contents.")
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