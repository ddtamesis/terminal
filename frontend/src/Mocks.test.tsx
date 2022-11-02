import React from 'react';
import { render, screen, within } from '@testing-library/react';
import REPL, { TEXT_input_text_accessible_name, TEXT_submit_button_accessible_name,
    TEXT_input_output_pair_accessible_name, TEXT_repl_command_history_accessible_name } from './REPL';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

//The following tests all test the mocked handlers to determine
//if we can test without the backend running

beforeEach(() => {
    render(<REPL />);
}); 

test('submitting mocked get then stats correctly', async () => {
    const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
    const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});
    userEvent.type(inputBox, 'mockedGet data/testing/test-basic.csv');
    userEvent.click(submitButton);
    const commandHistory = await screen.findByRole(/.*/, {name: TEXT_repl_command_history_accessible_name})
    const commandOutputPair = await within(commandHistory).findByRole(/.*/, {name: TEXT_input_output_pair_accessible_name});
    expect(commandOutputPair).toBeInTheDocument();
    const outputElement: HTMLElement = await within(commandOutputPair).findByRole("output")
    expect(outputElement.innerHTML).toBe('Output: [["Joe","12","Male"],["Sue","1","Female"],["Derek","17","Male"],["Quinn","20","Female"]]')
    const userInput2 : string = 'mockedStats'
   userEvent.type(inputBox, userInput2)
   userEvent.click(submitButton)
   const correctStats = await screen.findByText("Output: Rows: 4, Columns: 3")
   expect(correctStats).toBeInTheDocument();
   const commandOutputPair2 = await within(commandHistory).findAllByRole(/.*/, {name: TEXT_input_output_pair_accessible_name});
   expect(commandOutputPair2).toHaveLength(2)
   commandOutputPair2.forEach(elt => {
       expect(elt).toBeInTheDocument
   })
}
)

test('successful weather coordinates', async () => {
    const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
    const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});
    userEvent.type(inputBox, 'mockedWeather 41.8268 -71.4029');
    userEvent.click(submitButton);
   //test output exists
    const commandHistory = await screen.findByRole(/.*/, {name: TEXT_repl_command_history_accessible_name})
    expect(commandHistory).toBeInTheDocument()
    const commandOutputPair = await within(commandHistory).findByRole(/.*/, {name: TEXT_input_output_pair_accessible_name});
    const outputElement: HTMLElement = await within(commandOutputPair).getByRole("output")
    //since temp will always be fixed in mock
    expect(outputElement.innerHTML).toBe('Output: 40')

 })

 //we can proceed by mimicking the other tests, but this time with our mocks