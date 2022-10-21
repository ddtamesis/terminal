
// simple rectangular csv file! 
export const mockSimple = `[["name", "age", "school"],
    ["amy", "22", "brown"],
    ["bob", "18", "harvard"], 
    ["cheng", "21", "boston college"], 
    ["duke benson", "19", "boston university"], 
    ["esther", "19", "notre dame"], 
    ["grace", "21", "university of southern california"]]`

// this is an example of when you have empty string elements
export const mockSomeEmptyStrings = `[["name", "age", "school"],
    ["amy", "", "brown"],
    ["bob", "18", "harvard"], 
    ["cheng", "21", "boston college"], 
    ["duke benson", "19", ""], 
    ["", "19", "notre dame"], 
    ["grace", "21", ""]]`


// empty csv file - has rows and columns, but no entries, only empty strings
export const mockAllEmptyStrings = `[["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]]`

// a small csv with just 1 row with 1 element
export const mockSmall = `[[7]]`

// array of empty arrays
export const mockEmptyRows = `[[],
    [],
    [],
    [],
    []]`

// blank
export const mockNoRows = `[]`