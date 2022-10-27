const URL = `http://localhost:3230/`
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

let getCommand : REPLFunction;

getCommand = async function(args: Array<string>): Promise<string>  {
    return new Promise((resolve) => {
        if (args.length != 1) {
            resolve("Invalid number of arguments. Format as get <filepath>.")
        } 
        else {
            const loadCSVURL = `${URL}loadCSV?filepath=${CSVDirectory_Musa}${args[0]}`
            return fetch(loadCSVURL).then(response => response.json())
            .then()
    
    }
}



    )




   if (args.length != 1) {
        resolve("Invalid number of arguments.")
   } else {
        const loadCSVURL = `${URL}loadCSV?filepath=${CSVDirectory}${args[0]}`
        return fetch(loadCSVURL).
   }
    
}