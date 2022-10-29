import React from 'react';
import { render, screen, within } from '@testing-library/react';
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

test('submitting 1 successful get command', async () => {
    const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
    const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});

    userEvent.type(inputBox, 'get data/testing/test-basic.csv');
    userEvent.click(submitButton);

    const commandHistory = await screen.findByLabelText(TEXT_repl_command_history_accessible_name);
    const inputOutputPair = await within(commandHistory).findByLabelText(TEXT_input_output_pair_accessible_name + " " + 1);
    expect(inputOutputPair).toBeInTheDocument();
})

test('submitting get followed by stats', async () => {
    const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
    const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});

    userEvent.type(inputBox, 'get data/testing/test-basic.csv');
    userEvent.click(submitButton);
    userEvent.type(inputBox, 'stats');
    userEvent.click(submitButton);

    const commandHistory = await screen.findByLabelText(TEXT_repl_command_history_accessible_name);
    const inputOutputPair1 = await within(commandHistory).findByLabelText(TEXT_input_output_pair_accessible_name + " " + 1);
    const inputOutputPair2 = await within(commandHistory).findByLabelText(TEXT_input_output_pair_accessible_name + " " + 2);
    expect(inputOutputPair1).toBeInTheDocument();
    expect(inputOutputPair2).toBeInTheDocument();
})