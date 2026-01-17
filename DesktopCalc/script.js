/*
  calc logic
*/

(function () {

  let hasStarted = false;
 

  document.addEventListener('DOMContentLoaded', () => {
    if (hasStarted) return;
    hasStarted = true;

    const buttonArea = document.querySelector('.buttons');
    const display = document.getElementById('display');

    if (!buttonArea || !display) return;

    buttonArea.style.position = 'relative';

    const allButtons = [...buttonArea.querySelectorAll('.btn')];
    const numberButtons = allButtons.filter(isNumberButton);

    placeButtons(allButtons);
    listenForClicks(buttonArea, display, numberButtons);
  });



  function isNumberButton(btn) {
    const val = btn.getAttribute('data-value') || btn.textContent;
    return /^\d$/.test(val);
  }


  function listenForClicks(container, display, numberButtons) {
    container.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;

      const action = btn.getAttribute('data-action');
      const value = btn.getAttribute('data-value') || btn.textContent;

      if (action === 'clear') return resetDisplay(display);
      if (action === 'equals') return solve(display);
      if (value === 'SHIFT') return toggleShift(numberButtons);

      addToTheScreen(display, value);
    });
  }

  function resetDisplay(display) {
    display.value = '0';
  }

  function addToTheScreen(display, value) {
    if (display.value === 'Error') display.value = '0';

    display.value =
      display.value === '0' && value !== '.'
        ? value
        : display.value + value;
  }

  function solve(display) {
    try {
      const input = display.value
        .replace(/[Xx]/g, '*')
        .replace(/÷/g, '/')
        .replace(/%/g, '*0.01');

      const result = Function(`"use strict"; return (${input})`)();

      if (Number.isFinite(result)) {
        display.value = result;
      } else {
        showError(display);
      }
    } catch {
      showError(display);
    }
  }

  function showError(display) {
    display.value = 'Error';
    setTimeout(() => (display.value = '0'), 900);
  }

  function placeButtons(buttons) {}
  function toggleShift(numberButtons) {}

})();
