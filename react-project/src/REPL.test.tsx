import React from 'react';
import { render, screen } from '@testing-library/react';
import REPL, { TEXT_input_box_accessible_name, TEXT_input_text_accessible_name, 
    TEXT_submit_button_accessible_name, TEXT_submit_button_text,
     TEXT_input_output_pair_accessible_name, TEXT_repl_command_history_accessible_name } from './REPL';
import userEvent from '@testing-library/user-event';

test('renders command input box', () => {
    render(<REPL/>);
    const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
    expect(inputBox).toBeInTheDocument();
})

test('renders submit button', () => {
    render(<REPL />);
    const buttonElement = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});
    expect(buttonElement).toBeInTheDocument();
})

test('submitting 1 successful get command', () => {
    render(<REPL/>);
    const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
    const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});

    userEvent.type(inputBox, 'get data/testing/test-basic.csv');
    userEvent.click(submitButton);

    const inputOutputPair = screen.findByRole("group", {name: TEXT_input_output_pair_accessible_name + " " + 1});
    expect(inputOutputPair).toBeInTheDocument();
})