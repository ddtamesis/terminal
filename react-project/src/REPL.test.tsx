import React from 'react';
import { render, screen } from '@testing-library/react';
export const TEXT_repl_command_history_accessible_name = "command history"
import REPL, { TEXT_input_box_accessible_name, TEXT_input_text_accessible_name, 
    TEXT_submit_button_accessible_name, TEXT_submit_button_text, TEXT_input_button_accessible_name,
     TEXT_input_output_pair_accessible_name } from './REPL';
import userEvent from '@testing-library/user-event';

