import { validateHeaderValue } from 'http';
import React, { useState, Dispatch, SetStateAction } from 'react';


export const TEXT_submit_button_accessible_name = "submit button"
export const TEXT_submit_button_text = "Submit!"

function ReplHistory() {
  return (
    <div className="repl-history">
    </div>
  )
}
// TO DO: OldCommand to map commands in repl-history

interface ReplInputProps {
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
  ariaLabel: string
}

function ReplInput({value, setValue, ariaLabel}: ReplInputProps) {
  return (
    <input value={value}
            onChange={(ev) => setValue(ev.target.value)}
            aria-label={ariaLabel}
            className="repl-command-box"
            placeholder="Enter command here!"
            ></input>
  )
}

interface NewCommandProps {
  addCommand: (command: string) => any
}

function NewCommand({addCommand}: NewCommandProps) {
  const [textValue, setTextValue] = useState('');
  return (
    <div className="new-command">
      <div className="repl-input">
        <ReplInput value={textValue} setValue={setTextValue} ariaLabel='mock it'/>
      </div>
      <div>
        <button onClick={() => {
          addCommand(textValue)
          setTextValue('')
          }}
          aria-label={TEXT_submit_button_accessible_name}>
          {TEXT_submit_button_text}
        </button>
      </div>
    </div>
  )
}

export default function REPL() {
  const [commands, setCommands] = useState<string[]>([]);
    return (
      <div className="repl">
        <ReplHistory></ReplHistory>
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