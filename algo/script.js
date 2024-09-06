'use strict';

//! ********** CONSTANTS **********

const outputElt = document.querySelector('output');
const formElt   = document.querySelector('form');

//! ********** FUNCTIONS **********

/**
 * ? GET FIZZ BUZZ STRING
 * ? Generates the FizzBuzz string for the given number:
 *
 * * Determines if the given number is divisible by 3 or 5,
 * * And returns the corresponding string,
 * * If the number is not divisible by 3 or 5,
 * * The number itself is returned
 *
 * @param {number} number
 *  The number to generate the FizzBuzz string for
 * 
 * @return {string|number}
 *  The FizzBuzz string for the given number,
 *  or the number itself if no FizzBuzz conditions are met
 */
const getFizzBuzzString = (number) => {
  let string = "";

  if (number % 3 === 0) string += "Fizz";
  if (number % 5 === 0) string += "Buzz";

  return string || number;
}

/**
 * ? CREATE DATA ELEMENT
 * ? Creates & returns a data element with the given numbers & value:
 * 
 * * Creates a data element,
 * * Updates number & value to handle the input number if it is negative,
 * * Then sets the number to the value attribute of dataElt,
 * * And sets the value to the text content of dataElt & to the console,
 * * Finally returns the created data element
 * 
 * @param {number} inputNumber
 *  The input number given initially by the user
 * @param {number} number
 *  The number to display in the value attribute of the data element
 * @param {number|string} value
 *  The value to display in the content of the data element & in the console
 * 
 * @return {HTMLElement}
 *  The created data element
 */
const createDataElement = (inputNumber, number, value) => {
  const dataElt = document.createElement('data');

  number = (inputNumber < 0) ? -number : number;
  value  = (typeof value === 'string') ? value : number;

  dataElt.value       = number;
  dataElt.textContent = value;

  console.log(value);

  return dataElt;
}

/**
 * ? DISPLAY FIZZ BUZZ
 * ? Displays the FizzBuzz sequence up to the given number
 *
 * * Empty the output element
 * * Loop through the numbers from 1 to the absolute value of the input number
 * * Then get the FizzBuzz sequence up to the given number
 * * Then create a data element with the numbers & the FizzBuzz string
 * * Then display it in the output element
 *
 * @param {number} inputNumber
 *  The number to generate the FizzBuzz sequence up to
 */
const displayFizzBuzz = (inputNumber) => {
  outputElt.innerHTML = '';

  for (let i = 1; i <= Math.abs(inputNumber); i++) {
    const STRING  = getFizzBuzzString(i);
    const dataElt = createDataElement(inputNumber, i, STRING);

    outputElt.classList.add('result');
    outputElt.classList.remove('error');

    outputElt.appendChild(dataElt);
  }
}

/**
 * ? GENERATE FIZZ BUZZ
 * ? Generates the FizzBuzz sequence up to the given number
 * 
 * * Get the form submission event
 * * Get the input value as an integer
 * * Check if the input value is a valid number
 * * Display the FizzBuzz sequence
 *
 * @param {Event} e
 *  The event object triggered by the form submission
 */
const generateFizzBuzz = (e) => {
  e.preventDefault();

  const inputElt    = document.querySelector('input');
  const INPUT_VALUE = parseInt(inputElt.value.trim(), 10);
  inputElt.value    = '';

  if (isNaN(INPUT_VALUE)) {
    outputElt.value = 'Please type a valid number';
    outputElt.classList.add('error');

    return;
  }

  displayFizzBuzz(INPUT_VALUE);
}

//! ********** MAIN **********

formElt.addEventListener('submit', generateFizzBuzz);
