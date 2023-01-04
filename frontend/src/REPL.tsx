import { getHandler, mockedGetHandler } from './handlers/GetHandler';
import { weatherHandler, mockedWeatherHandler } from './handlers/WeatherHandler';
import { statsHandler, mockedStatsHandler } from './handlers/StatsHandler';

import React, { useState, Dispatch, SetStateAction } from 'react';
import './REPL.css'
export const TEXT_input_box_accessible_name = "command input box"
export const TEXT_input_text_accessible_name = "your command input"
export const TEXT_submit_button_accessible_name = "submit your command"
export const TEXT_submit_button_text = "Submit!"
export const TEXT_input_output_pair_accessible_name = "your command and the outputted result"
export const TEXT_repl_command_history_accessible_name = "command history"

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

/**
 * A dictionary that stores the command name and associated REPLFunction to be executed when the command is submitted
 */
let commandDict = new Map<string, REPLFunction>(); 
addCommandToDict("get", getHandler);
addCommandToDict("stats", statsHandler);
addCommandToDict("weather", weatherHandler);

//adding out mocked handlers
addCommandToDict("mockedWeather", mockedWeatherHandler);
addCommandToDict("mockedGet", mockedGetHandler);
addCommandToDict("mockedStats", mockedStatsHandler);


// a boolean to track whether stats can run
let csvLoaded = false;

/**
 * Adds command to the command dictionary
 * @param command - the command name
 * @param funct - the associated REPLFunction to invoke
 */
function addCommandToDict(command : string, funct : REPLFunction) {
  commandDict.set(command, funct)
}

/**
 * Properties of repl input
 */
interface ReplInputProps {
  commandWithArgs: string,
  setCommand: Dispatch<SetStateAction<string>>,
  ariaLabel: string
}

/**
 * Creates the input textbox for the repl input to be entered
 * @param param0 - an object with repl input props
 * @returns an HTMLInputElement
 */
function ReplInput({commandWithArgs, setCommand, ariaLabel}: ReplInputProps) {
  return (
    <input value={commandWithArgs}
            onChange={(ev) => setCommand(ev.target.value)}
            aria-label={ariaLabel}
            className="repl-command-box"
            placeholder="Enter command here!"
            >
            </input>
  )
}

/**
 * Properties of new command input
 */
interface NewCommandProps {
  addCommand: (command: string) => void;
}

/**
 * Updates the new command input element according to new commands entered
 * 
 * @param param0 - an object with new command properties
 * @returns - a new-command-input div
 */
function NewCommand({addCommand}: NewCommandProps) {
  const [input, setInputValue] = useState('');

  return (
    <div className="new-command-input">
      <div className="repl-input" aria-label={TEXT_input_box_accessible_name}>
        <ReplInput commandWithArgs={input} setCommand={setInputValue} ariaLabel={TEXT_input_text_accessible_name}/>
      </div>
      <button onClick={() => {
        addCommand(input)
        setInputValue('')
        }}
        aria-label={TEXT_submit_button_accessible_name}>
        {TEXT_submit_button_text}
      </button>
    </div>
  )
}

/**
 * Returns a string wrapped inside a promise that represents 
 * the output for the given command
 */
 function invokeCommand(command : string) : Promise<string> {
  const args : string[] = command.trim().split(' ');
  const comm : string = args[0];
  const commandArgs : string[] = args.slice(1);

  if (commandDict.has(comm)) {
    const myFunc : REPLFunction | undefined = commandDict.get(comm);

    if (myFunc === undefined) {
      return Promise.resolve(comm + "'s function is undefined.")
    }
    if ((myFunc === getHandler) || (myFunc == mockedGetHandler))
    {
      csvLoaded = true;

    }
    if (((myFunc === statsHandler) || (myFunc === mockedStatsHandler)) && !csvLoaded) {
      return Promise.resolve('Please load a csv with "get <filepath>" before calling stats.')
    }

    return myFunc(commandArgs);
  } else {

    return Promise.resolve(comm + " does not exist.");
    }
  }

  /**
   * Properties for command history
   */
interface ReplHistoryProps {
  resultPair: string[]
}

/**
 * Updates the command history to with a command/output pair div
 * 
 * @param param0 - an object with repl history properties
 * @returns - result-pair div for the given command
 */
function UpdateHistory({resultPair}: ReplHistoryProps) {
  const commandInput: string = resultPair[0];
  const output: string = resultPair[1];
  const label = TEXT_input_output_pair_accessible_name
  return (
    <div className={"result-pair-"+commandInput} aria-label={label} role="group">
      <p role="command">Command: {commandInput}</p>
      <p role="output">Output: {output}</p>
    </div>
  );  
}

/**
 * Renders the REPL and creates the state changes for the REPL as commands are entered.
 * 
 * @returns the updated REPL component
 */
export default function REPL() {
  const [resultPairs, setResultPairs] = useState<string[][]>([]);

  return (
    <div className="repl"> 
      <div className = "repl-history" aria-label={TEXT_repl_command_history_accessible_name}>
        {resultPairs.map( (resultPair,key) => 
        <UpdateHistory           
          resultPair={resultPair}
          key={key} />)}        
      </div>
      <NewCommand
        addCommand={(command: string) => {
          const newResultPairs = resultPairs.slice();
          invokeCommand(command)
            .then(resp=> newResultPairs.push([command, resp]))
            .then(() => setResultPairs(newResultPairs))
        }}
      />
    </div>
  );
  }

