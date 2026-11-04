# JavaScript Exercises 1–7

Solutions are in `src/exercises.js` and Jest tests are in `tests/exercises.test.js`.

## Run

```bash
npm install
npm test
```

## Exercise 7: `var` versus `let`

Callbacks created inside a `for (var i...)` loop capture **the same function-scoped variable**. When executed after the loop ends, they all return `3`: `[3, 3, 3]`.

In a `for (let i...)` loop, JavaScript creates **a fresh lexical binding for each iteration**. The callbacks therefore return `[0, 1, 2]`.

## End-of-week note

This week I practiced array methods (`map`, `filter`, `reduce`), `Set`, string normalization, small composable functions, Jest tests, and JavaScript loop scoping. I added tests for expected outputs and edge cases (empty input and invalid cart values). I want to improve my ability to choose clean data structures and write edge-case tests before implementing functions.
