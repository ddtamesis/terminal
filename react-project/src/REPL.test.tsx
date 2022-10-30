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

    userEvent.type(inputBox, 'get data/testing/test-basic.csv');
    userEvent.click(submitButton);
    let allResults = await screen.findAllByRole("group")
    
    userEvent.type(inputBox, 'stats');
    userEvent.click(submitButton);
    allResults = await screen.findAllByRole("group")

    allResults = await screen.findAllByRole("group")
    allResults.forEach(elt => {
        expect(elt).toBeInTheDocument;
    })

    const statsResult = await screen.findByText("Output: Rows: 4, Columns: 3")
    expect(statsResult).toBeInTheDocument()
})

// tests updating stats after new csv file loaded
test('submitting 2 different stats requests', async () => {
    render(<REPL />)
    const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
    const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});

    userEvent.type(inputBox, 'get data/testing/test-basic.csv');
    userEvent.click(submitButton);
    let allResults = await screen.findAllByRole("group", {name: TEXT_input_output_pair_accessible_name})
    
    userEvent.type(inputBox, 'stats');
    userEvent.click(submitButton);
    allResults = await screen.findAllByRole("group", {name: TEXT_input_output_pair_accessible_name})

    userEvent.type(inputBox, 'get data/testing/test-empty.csv');
    userEvent.click(submitButton);
    allResults = await screen.findAllByRole("group", {name: TEXT_input_output_pair_accessible_name})
    
    userEvent.type(inputBox, 'stats');
    userEvent.click(submitButton);
    allResults = await screen.findAllByRole("group", {name: TEXT_input_output_pair_accessible_name})
    allResults = await screen.findAllByRole("group", {name: TEXT_input_output_pair_accessible_name})
    allResults = await screen.findAllByRole("group", {name: TEXT_input_output_pair_accessible_name})

    allResults.forEach(elt => {
        expect(elt).toBeInTheDocument;
    })

    const statsResult1 = await screen.findByText("Output: Rows: 4, Columns: 3")
    expect(statsResult1).toBeInTheDocument()
    const statsResult2 = await screen.findByText("Output: Rows: 0, Columns: 0")
    expect(statsResult2).toBeInTheDocument()
})

// tests get, stats, unsuccessful get, and stats again (should return stats of last successful csv load)
// test('submitting successful get and stats followed by an unsuccessful get and successful stats', async () => {
//     render(<REPL />)
//     const inputBox = screen.getByRole("textbox", {name: TEXT_input_text_accessible_name});
//     const submitButton = screen.getByRole("button", {name: TEXT_submit_button_accessible_name});

//     userEvent.type(inputBox, 'get data/testing/test-basic.csv');
//     userEvent.click(submitButton);
//     let allResults = await screen.findAllByRole("group", {name: TEXT_input_output_pair_accessible_name});
    
//     userEvent.type(inputBox, 'stats');
//     userEvent.click(submitButton);
//     allResults = await screen.findAllByRole("group", {name: TEXT_input_output_pair_accessible_name})

//     userEvent.type(inputBox, 'get gibberish-filepath');
//     userEvent.click(submitButton);
//     allResults = await screen.findAllByRole("group", {name: TEXT_input_output_pair_accessible_name})

//     userEvent.type(inputBox, 'stats');
//     userEvent.click(submitButton);
//     allResults = await screen.findAllByRole("group", {name: TEXT_input_output_pair_accessible_name})

//     allResults.forEach(elt => {
//         expect(elt).toBeInTheDocument;
//     })

//     const statsResult1 = await screen.findByText("Output: Rows: 4, Columns: 3")
//     expect(statsResult1).toBeInTheDocument()
// })



// TO DO...

// tests 2 get requests in a row
// tests successful weather coordinates
// tests invalid weather coordinates
// tests weather without coordinates
// tests 2 weather requests in a row

