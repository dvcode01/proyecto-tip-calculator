"use strict";

// Elements
var buttons = document.querySelectorAll('.calculator__button');
var customElement = document.querySelector('.calculator__input--custom');
var billElement = document.querySelector('#bill');
var peopleElement = document.querySelector('.calculator__input--persons');
var totalElement = document.querySelector('.calculator__result--total');
var amountElement = document.querySelector('.calculator__result--amount');
var alertElement = document.querySelector('.calculator__alert');
var resetElement = document.querySelector('.calculator__reset');

// variables
var tipValue = 5;
var customValue = parseInt(customElement.value);
var peopleValue = parseInt(peopleElement.value);
var billValue = parseInt(billElement.value);

// Eventos | Events
eventListeners();
function eventListeners() {
  buttons.forEach(function (button) {
    button.addEventListener('click', selectTip);
  });
  billElement.addEventListener('input', updateBill);
  peopleElement.addEventListener('input', updatePeople);
  customElement.addEventListener('input', updateCustom);
  customElement.addEventListener('click', selectCustom);
  resetElement.addEventListener('click', resetAll);
}

// Funciones | Functions

function selectTip(e) {
  // cambio de estilo en los botones || button style change
  removeActive();
  e.target.classList.add('calculator__button--selected');

  // asignacion del valor de la propina | tip value assignment
  tipValue = parseInt(e.target.textContent.slice(0, -1));
  calculateTip();
}
function calculateTip() {
  if (peopleValue === 0 || isNaN(peopleValue)) {
    return;
  }

  // calculo de monto de propina | tip amount calculation
  amountElement.textContent = "$".concat((tipValue / 100 * billValue / peopleValue).toFixed(2));

  // calculo del total a pagar | calculation of the total to pay
  totalElement.textContent = "$".concat(((tipValue + billValue) / peopleValue).toFixed(2));
}

// borrar estilos de los botones | delete button styles
function removeActive() {
  buttons.forEach(function (button) {
    button.classList.remove('calculator__button--selected');
  });
}
function updateBill(e) {
  billValue = parseFloat(e.target.value);
  if (billValue == 0 || isNaN(billValue)) {
    return;
  }
  calculateTip();
}
function updatePeople(e) {
  peopleValue = parseFloat(e.target.value);
  if (peopleValue === 0 || isNaN(peopleValue)) {
    peopleElement.style.borderColor = 'red';
    alertElement.classList.add('error');
  } else {
    peopleElement.style.borderColor = 'hsl(172, 67%, 45%)';
    alertElement.classList.remove('error');
    calculateTip();
  }
}
function selectCustom() {
  removeActive();
}

// actualizar propinas usando custom | update tips using custom
function updateCustom(e) {
  customValue = e.target.value;
  tipValue = parseFloat(customValue);
  if (!isNaN(tipValue)) {
    calculateTip();
  }
}

// resetea todos los valores | reset all values
function resetAll() {
  billValue = 0;
  billElement.value = 0;
  peopleElement.value = 1;
  peopleValue = 1;
  tipValue = 0;
  calculateTip();
}