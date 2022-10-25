import { validateHeaderValue } from 'http';
import React, { useState, Dispatch, SetStateAction } from 'react';
import './REPL.css'
export const TEXT_submit_button_accessible_name = "submit button"
export const TEXT_submit_button_text = "Submit!"
export const TEXT_input_button_accessible_name = "input button"



var commandDict = new Map<string, Function>(); 
addCommandToDict("get", ()=> "get");
addCommandToDict("stats", ()=> "stats");


function addCommandToDict(command : string, funct : Function) {
  commandDict.set(command, funct)
}


function CommandOutput(command : string) {
  const commandArgs = command.trim().split(' ');
  const comm = commandArgs[0];
  if (commandDict.has(comm)) {
    const myFunc = commandDict.get(comm);
  
    if (myFunc == undefined) {
      return commandArgs[0] + "'s function is undefined."
    }
    else {
      return myFunc(comm);
    }
  
  }
  else {
    return commandArgs[0] + " is undefined."
  }
}


function CommandLog({command}: ReplHistoryProps){
  const output = CommandOutput(command);
  const label: string = output.endsWith("undefined.") ? 'Valid Command' : 'Invalid Command';

  return (
    <div className="command-log"
    aria-label ={label}>
      <p>Command: {command}</p>
      <p>Output: {output}</p>
    </div>
  );  
}

// TO DO: OldCommand to map commands in repl-history

interface ReplHistoryProps {
  command: string
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
  addCommand: (command: string) => any
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
  const [commands, setCommands] = useState<string[]>([]);
    return (
      <div className="App">
        {commands.map( (command,commandKey) => 
        <CommandLog           
          command={command}
          key={commandKey} />)}

        <NewCommand 
          addCommand={(command: string) => {
            const newCommands = commands.slice();
            newCommands.push(command)
            setCommands(newCommands)
          }}
        />
      </div>
    );
  }