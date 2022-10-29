import React from 'react';
import { cleanup, render, screen, within } from '@testing-library/react';
import REPL, { TEXT_input_box_accessible_name, TEXT_input_text_accessible_name, 
    TEXT_submit_button_accessible_name, TEXT_submit_button_text,
     TEXT_input_output_pair_accessible_name, TEXT_repl_command_history_accessible_name } from './REPL';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
    render(<REPL />)
  })

test('renders command history', () => {
    const commandHistory = screen.getByLabelText(TEXT_repl_command_history_accessible_name);
    expect(commandHistory).toBeInTheDocument();
}
)

test('renders command input box', () => {
    const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
    expect(inputBox).toBeInTheDocument();
})

test('renders submit button', () => {
    const buttonElement = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});
    expect(buttonElement).toBeInTheDocument();
})

// test('submitting 1 successful get command', async () => {
//     const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
//     const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});

//     userEvent.type(inputBox, 'get data/testing/test-basic.csv');
//     userEvent.click(submitButton);

//     const commandHistory = await screen.findByRole(/.*/, {name: TEXT_repl_command_history_accessible_name});
//     const inputOutputPair = await within(commandHistory).findByRole(/.*/, {name: TEXT_input_output_pair_accessible_name});
//     expect(inputOutputPair).toBeInTheDocument();

//     const outputElement: HTMLElement = await within(inputOutputPair).findByRole("output")
//     expect(outputElement.innerHTML).toBe('Output: [["Joe","12","Male"],["Sue","1","Female"],["Derek","17","Male"],["Quinn","20","Female"]]')
// })


test('submitting get followed by stats', async () => {
    const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
    const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});

    userEvent.type(inputBox, 'get data/testing/test-basic.csv');
    userEvent.click(submitButton);
    userEvent.type(inputBox, 'stats');
    userEvent.click(submitButton);

    const commandHistory = await screen.findByRole(/.*/, {name: TEXT_repl_command_history_accessible_name});
    let allInputOutputPairs = await within(commandHistory).findAllByRole(/.*/, {name: TEXT_input_output_pair_accessible_name})
   
    allInputOutputPairs.forEach(elt => {
        expect(elt).toBeInTheDocument();
    })
    expect(allInputOutputPairs).toHaveLength(2);

    const statsResult = allInputOutputPairs[1].innerHTML
    expect(statsResult).toBe('Output: Rows: 4, Columns: 3')
})