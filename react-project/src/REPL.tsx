import { REPLFunction } from './handlers/REPLInterface';
import { getHandler } from './handlers/GetHandler';
import { weatherHandler } from './handlers/WeatherHandler';
import { statsHandler } from './handlers/StatsHandler';

import React, { useState, Dispatch, SetStateAction } from 'react';
import './REPL.css'
export const TEXT_input_box_accessible_name = "command input box"
export const TEXT_input_text_accessible_name = "your command input"
export const TEXT_submit_button_accessible_name = "submit your command"
export const TEXT_submit_button_text = "Submit!"
export const TEXT_input_output_pair_accessible_name = "your command and the outputted result"
export const TEXT_repl_command_history_accessible_name = "command history"


let commandDict = new Map<string, REPLFunction>(); 
addCommandToDict("get", getHandler);
addCommandToDict("stats", statsHandler);
addCommandToDict("weather", weatherHandler);

let csvLoaded = false;
let inputSubmissionCount = 1;

function addCommandToDict(command : string, funct : REPLFunction) {
  commandDict.set(command, funct)
}

interface ReplInputProps {
  commandWithArgs: string,
  setCommand: Dispatch<SetStateAction<string>>,
  ariaLabel: string
}

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

interface NewCommandProps {
  addCommand: (command: string) => void;
}


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

    if (myFunc == undefined) {
      return Promise.resolve(comm + "'s function is undefined.")
    }
    if (myFunc == getHandler) {
      csvLoaded = true;
    }
    if (myFunc == statsHandler && !csvLoaded) {
      return Promise.resolve('Please load a csv with "get <filepath>" before calling stats.')
    }
    
    return myFunc(commandArgs);
  } else {
    return Promise.resolve(comm + " does not exist.");
    }
  }

interface ReplHistoryProps {
  resultPair: string[]
}

function UpdateHistory({resultPair}: ReplHistoryProps) {
  const commandInput: string = resultPair[0];
  const output: string = resultPair[1];
  const label = TEXT_input_output_pair_accessible_name + " " + inputSubmissionCount
  inputSubmissionCount++;
  return (
    <div className={"result-pair-"+commandInput} aria-label={label}>
      <p>Command: {commandInput}</p>
      <p>Output: {output}</p>
    </div>
  );  
}

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

