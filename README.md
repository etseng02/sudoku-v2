# Sudoku Solver

![gif of sudoku solver placing each number down](src/screenshots/screenshot1.gif)

## Features
* Tries to solve simple sudokus by checking the row column and within its own square block.
* Shows user the next number and solves sudoku sequentially.
* Adds a toast to let user know that running the solving algorithm was completed or errored out.
* Shows a toast if there are duplicated numbers in a completed sudoku.
* Allows user to stop the solving process any time before completion.
* Allows user to solve in normal or fast mode.

## Getting started
1. Use node 20.7+
2. Clone repo
3. Run `npm install`
4. Run `npm run dev`


## Limitations
1. Cannot run on lower node versions.
2. Cannot solve much harder sudokus.