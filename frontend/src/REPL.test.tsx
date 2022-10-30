import React from 'react';
import { render, screen, within } from '@testing-library/react';
import REPL, { TEXT_input_text_accessible_name, TEXT_submit_button_accessible_name,
    TEXT_input_output_pair_accessible_name, TEXT_repl_command_history_accessible_name } from './REPL';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
 
// The following tests are all integration tests that check whether expected HTMLElements are updated/present in the document.
 
// tests whether the command history is rendered in the document
test('renders command history', () => {
   render(<REPL />)
   const commandHistory = screen.getByLabelText(TEXT_repl_command_history_accessible_name);
   expect(commandHistory).toBeInTheDocument();
})
 
// tests whether the command input box is rendered in the document
test('renders command input box', () => {
   render(<REPL />)
   const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
   expect(inputBox).toBeInTheDocument();
})
 
// tests whether the command input box is rendered in the document
test('renders submit button', () => {
   render(<REPL />)
   const buttonElement = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});
   expect(buttonElement).toBeInTheDocument();
})
 
// tests an unsuccessful stats request due to not calling get first
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
 
// tests a successful get command
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
 
// tests successful stats request after getting a csv file
test('submitting successful get followed by successful stats', async () => {
   render(<REPL />)
   const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
   const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});
   const userInput1 : string = 'get data/testing/test-basic.csv'
   userEvent.type(inputBox, userInput1);
   userEvent.click(submitButton);
   const commandHistory = await screen.findByRole(/.*/, {name: TEXT_repl_command_history_accessible_name})
   const commandOutputPair = await within(commandHistory).findByRole(/.*/, {name: TEXT_input_output_pair_accessible_name});
   expect(commandOutputPair).toBeInTheDocument();
   const outputElement: HTMLElement = await within(commandOutputPair).findByRole("output")
   expect(outputElement.innerHTML).toBe('Output: [["Joe","12","Male"],["Sue","1","Female"],["Derek","17","Male"],["Quinn","20","Female"]]')
  
   const userInput2 : string = 'stats'
   userEvent.type(inputBox, userInput2)
   userEvent.click(submitButton)
   const correctStats = await screen.findByText("Output: Rows: 4, Columns: 3")
   expect(correctStats).toBeInTheDocument();
   const commandOutputPair2 = await within(commandHistory).findAllByRole(/.*/, {name: TEXT_input_output_pair_accessible_name});
   expect(commandOutputPair2).toHaveLength(2)
   commandOutputPair2.forEach(elt => {
       expect(elt).toBeInTheDocument
   })
})
 
//tests updating stats after new csv file loaded
test('submitting 2 different stats requests', async () => {
   render(<REPL />)
   const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
   const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});
   userEvent.type(inputBox, 'get data/testing/test-basic.csv');
   userEvent.click(submitButton);
 
   const waitForGet = await screen.findByText("Command: get data/testing/test-basic.csv")
 
   userEvent.type(inputBox, 'stats');
   userEvent.click(submitButton);
  
   const correctStats = await screen.findByText("Output: Rows: 4, Columns: 3")
   expect(correctStats).toBeInTheDocument();
 
   userEvent.type(inputBox, 'get data/testing/test-empty.csv');
   userEvent.click(submitButton);
   const waitForCommand = await screen.findByText("Command: get data/testing/test-empty.csv")
 
   userEvent.type(inputBox, 'stats');
   userEvent.click(submitButton);
 
   const correctStats2 = await screen.findByText("Output: Rows: 0, Columns: 0")
   expect(correctStats2).toBeInTheDocument()
 
   const commandHistory = await screen.findByRole(/.*/, {name: TEXT_repl_command_history_accessible_name})
   const commandOutputPair = await within(commandHistory).findAllByRole(/.*/, {name: TEXT_input_output_pair_accessible_name});
   expect(commandOutputPair).toHaveLength(4)
   commandOutputPair.forEach(elt => {
       expect(elt).toBeInTheDocument
   })
 
 
})
 
 
//test two gets in a row works as expected
test("two gets in a row works", async () => {
   render(<REPL />)
   const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
   const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});
   userEvent.type(inputBox, 'get data/testing/test-basic.csv');
   userEvent.click(submitButton);
 
   const waitForGet = await screen.findByText("Command: get data/testing/test-basic.csv")
   expect(waitForGet).toBeInTheDocument();
   userEvent.type(inputBox, 'get data/testing/test-empty.csv');
   userEvent.click(submitButton);
  
   const waitForGet2 = await screen.findByText("Command: get data/testing/test-empty.csv")
   expect(waitForGet2).toBeInTheDocument();
 
 
   userEvent.type(inputBox, 'stats');
   userEvent.click(submitButton);
 
   const correctStats = await screen.findByText("Output: Rows: 0, Columns: 0")
   expect(correctStats).toBeInTheDocument()
 
   const commandHistory = await screen.findByRole(/.*/, {name: TEXT_repl_command_history_accessible_name})
   const commandOutputPair = await within(commandHistory).findAllByRole(/.*/, {name: TEXT_input_output_pair_accessible_name});
   expect(commandOutputPair).toHaveLength(3)
   commandOutputPair.forEach(elt => {
        expect(elt).toBeInTheDocument
    })
})
 
// tests successful weather coordinates
test('successful weather coordinates', async () => {
   render(<REPL />)
   const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
   const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});
   userEvent.type(inputBox, 'weather 41.8268 -71.4029');
   userEvent.click(submitButton);
  //test output exists
   const commandHistory = await screen.findByRole(/.*/, {name: TEXT_repl_command_history_accessible_name})
   expect(commandHistory).toBeInTheDocument()
})
 
// tests invalid weather coordinates
test('invalid weather coordinates', async () => {
   render(<REPL />)
   const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
   const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});
   userEvent.type(inputBox, 'weather -999 -71.4029');
   userEvent.click(submitButton);
   const invalidResponse = await screen.findByText("Output: Unable to retrieve the weather for those coordinates.")
   expect(invalidResponse).toBeInTheDocument()
})
 
// tests weather without coordinates
test('weather without coordinates', async () => {
   render(<REPL />)
   const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
   const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});
   userEvent.type(inputBox, 'weather');
   userEvent.click(submitButton);

   const commandHistory = await screen.findByRole(/.*/, {name: TEXT_repl_command_history_accessible_name});
   const commandOutputPair = await within(commandHistory).findByRole(/.*/, {name: TEXT_input_output_pair_accessible_name});
   expect(commandOutputPair).toBeInTheDocument();
 
   const outputElement: HTMLElement = await within(commandOutputPair).findByRole("output")
   expect(outputElement.innerHTML).toBe('Output: Invalid arguments. Please enter weather &lt;lat&gt; &lt;lon&gt;')

  // const invalidResponse = await screen.findByText("Output: Invalid arguments. Please enter weather &lt;lat&gt; &lt;lon&gt;")
  // expect(invalidResponse).toBeInTheDocument()
})
 
 
// tests 2 weather requests in a row
test('two weather requests in a row', async () => {
   render(<REPL />)
   const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
   const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});
   userEvent.type(inputBox, 'weather 41.8268 -71.4029');
   userEvent.click(submitButton);
   const waitForFirst = await screen.findByText("Command: weather 41.8268 -71.4029")
 
   userEvent.type(inputBox, 'weather 39.7456 -97.0892');
   userEvent.click(submitButton);
 
   await screen.findByText("Command: weather 39.7456 -97.0892")
   const commandHistory = await screen.findByRole(/.*/, {name: TEXT_repl_command_history_accessible_name})
   const commandOutputPair = await within(commandHistory).findAllByRole(/.*/, {name: TEXT_input_output_pair_accessible_name});
   expect(commandOutputPair).toHaveLength(2)
   commandOutputPair.forEach(elt => {
        expect(elt).toBeInTheDocument
    })
})
 
 
