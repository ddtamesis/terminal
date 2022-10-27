import { validateHeaderValue } from 'http';
import { REPLFunction } from './REPLInterface';
import { getHandler } from './GetHandler';
import { weatherHandler } from './WeatherHandler';
import { statsHandler } from './StatsHandler';

import React, { useState, Dispatch, SetStateAction } from 'react';
import './REPL.css'
export const TEXT_submit_button_accessible_name = "submit button"
export const TEXT_submit_button_text = "Submit!"
export const TEXT_input_button_accessible_name = "input button"


var commandDict = new Map<string, REPLFunction>(); 

addCommandToDict("get", getHandler);
addCommandToDict("stats", statsHandler);
addCommandToDict("weather", weatherHandler);


function addCommandToDict(command : string, funct : REPLFunction) {
  commandDict.set(command, funct)
}

/**
 * Returns a string wrapped inside a promise that represents 
 * the output for the given command
 */
function CommandOutput(command : string) : Promise<string> {
  const args : string[] = command.trim().split(' ');
  const comm : string = args[0];
  const commandArgs : string[] = args.slice(1);

  if (commandDict.has(comm)) {
    const myFunc : Function | undefined = commandDict.get(comm);
  
    if (myFunc == undefined) {
      return new Promise(resolve => {
  
          resolve(comm + "'s function is undefined.")})
    }

    else {
      return myFunc(commandArgs);
    }
  
  }
  else {
    return new Promise(resolve => {
          resolve(comm + " is undefined.")})
    }
  }



function UpdateHistory({resultPair}: ReplHistoryProps) {
  
  return (
    <div aria-label = "later" >
      <p>Command: {resultPair[0]}</p>
      <p>Output: {resultPair[1]}</p>
    </div>
  );  
}

// TO DO: OldCommand to map commands in repl-history

interface ReplHistoryProps {
  resultPair: string[]
}

interface ReplInputProps {
  command: string,
  setCommand: Dispatch<SetStateAction<string>>,
  ariaLabel: string
}

function ReplInput({command, setCommand, ariaLabel}: ReplInputProps) {
  return (
    <input value={command}
            onChange={(ev) => setCommand(ev.target.value)}
            aria-label={ariaLabel}
            className="repl-command-box"
            placeholder="Enter command here!"
            >
            </input>
  )
}

interface NewCommandProps {
  addCommand: (command: string) => any; //change to void later
}


function NewCommand({addCommand}: NewCommandProps) {
  const [input, setInputValue] = useState('');

  return (
    <div className="new-command">
      <div className="repl-input">
        <ReplInput command={input} setCommand={setInputValue} ariaLabel='mock it'/>
      </div>
      <div>
        <button onClick={() => {
          addCommand(input)
          setInputValue('')
          }}
          aria-label={TEXT_input_button_accessible_name}>
          {TEXT_submit_button_text}
        </button>
      </div>
    </div>
  )
}


export default function REPL() {
  const [resultPairs, setResultPairs] = useState<string[][]>([]);


    return (
      <div className="App"> 
          <div className = "History">
          {resultPairs.map( (resultPair,key) => 
          <UpdateHistory           
            resultPair={resultPair}
            key={key} />)}
      
  
        <NewCommand
          addCommand={(command: string) => {
            const newResultPairs = resultPairs.slice();
            CommandOutput(command)
              .then(resp=> newResultPairs.push([command, resp]))
              .then(() => setResultPairs(newResultPairs))
          }}
        />
        
      </div>
      </div>
    );
  }

