import { REPLFunction } from "./ReplFunctions";

let weatherHandler: REPLFunction = (args: Array<string>): Promise<string> => {
    const lat: string = args[0];
    const lon: string = args[1];
    const promise: Promise<string> = fetch(`http://localhost:3232/weather?lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(r => {
            let output: string = (r.result === "success") ? r.temperature : r.result;
            return output;
        })
    return promise;
}

export {weatherHandler}