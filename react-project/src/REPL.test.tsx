import React from 'react';
import { render, screen, within } from '@testing-library/react';
import REPL, { TEXT_input_box_accessible_name, TEXT_input_text_accessible_name, 
    TEXT_submit_button_accessible_name, TEXT_submit_button_text,
     TEXT_input_output_pair_accessible_name, TEXT_repl_command_history_accessible_name } from './REPL';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// beforeEach(() => {
//     render(<REPL />)
//   })

test('renders command history', () => {
    render(<REPL />)
    const commandHistory = screen.getByLabelText(TEXT_repl_command_history_accessible_name);
    expect(commandHistory).toBeInTheDocument();
}
)

test('renders command input box', () => {
    render(<REPL />)
    const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
    expect(inputBox).toBeInTheDocument();
})

test('renders submit button', () => {
    render(<REPL />)
    const buttonElement = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});
    expect(buttonElement).toBeInTheDocument();
})

test('submitting stats without get', async () => {
    render(<REPL />)
    const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
    const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});

    userEvent.type(inputBox, 'stats');
    userEvent.click(submitButton);

    const commandHistory = await screen.findByRole(/.*/, {name: TEXT_repl_command_history_accessible_name});
    const commandOutputPair = await within(commandHistory).findByRole(/.*/, {name: TEXT_input_output_pair_accessible_name});
    expect(commandOutputPair).toBeInTheDocument();

    const outputElement: HTMLElement = await within(commandOutputPair).findByRole("output")
    expect(outputElement.innerHTML).toBe('Output: Please load a csv with \"get &lt;filepath&gt;\" before calling stats.')
})

test('submitting 1 successful get command', async () => {
    render(<REPL />)
    const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
    const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});

    userEvent.type(inputBox, 'get data/testing/test-basic.csv');
    userEvent.click(submitButton);

    const commandHistory = await screen.findByRole(/.*/, {name: TEXT_repl_command_history_accessible_name});
    const commandOutputPair = await within(commandHistory).findByRole(/.*/, {name: TEXT_input_output_pair_accessible_name});
    expect(commandOutputPair).toBeInTheDocument();

    const outputElement: HTMLElement = await within(commandOutputPair).findByRole("output")
    expect(outputElement.innerHTML).toBe('Output: [["Joe","12","Male"],["Sue","1","Female"],["Derek","17","Male"],["Quinn","20","Female"]]')
})

test('submitting get followed by stats', async () => {
    render(<REPL />)
    const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
    const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});

    userEvent.type(inputBox, 'get data/testing/test-basic.csv');
    userEvent.click(submitButton);
    let allResults = await screen.findAllByRole("group", {name: TEXT_input_output_pair_accessible_name})
    expect(allResults).toHaveLength(1)
    
    userEvent.type(inputBox, 'stats');
    userEvent.click(submitButton);
    allResults = await screen.findAllByRole("group", {name: TEXT_input_output_pair_accessible_name})
    expect(allResults).toHaveLength(2)

    const statsResult = await screen.findByText("Output: Rows: 4, Columns: 3")
    expect(statsResult).toBeInTheDocument()
})

// test get, stats, unsuccessful get, and stats again (should return stats of last successful csv load)
// test 2 get requests in a row
// test successful weather coordinates
// test invalid weather coordinates
// test weather without coordinates
// test 2 weather requests in a row

