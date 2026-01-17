/* calc logic */

(function () {

    let hasStarted = false;
    let shiftIsOn = false;
  
    document.addEventListener('DOMContentLoaded', function () {
  
      if (hasStarted) return;
      hasStarted = true;
  
      const buttonArea = document.querySelector('.buttons');
      const display = document.getElementById('display');
  
      if (!buttonArea || !display) return;
  
      
      buttonArea.style.position = 'relative';
  
      const allButtons = Array.from(buttonArea.querySelectorAll('.btn'));
      const numberButtons = allButtons.filter(btn => {
        const val = btn.getAttribute('data-value') || btn.textContent;
        return /^\d$/.test(val);
      });
  
      
      placeButtons(allButtons);
      listenForClicks(buttonArea, display, numberButtons);

   
      setTimeout(function() {
          alert("For best viewing experience please rotate your device.");
      }, 10);
    });
  
    
    function placeButtons(buttons) {
      buttons.forEach(function (button) {
        button.style.position = 'absolute';
  
        const pos = button.getAttribute('data-pos') || '';
        const parts = pos.split(',');
  
        const x = Number(parts[0]) || 0;
        const y = Number(parts[1]) || 0;
        const r = Number(parts[2]) || 0;
  
        button.style.left = x + 'px';
        button.style.top = y + 'px';
        button.style.transform = 'rotate(' + r + 'deg)';
      });
    }
  
    function listenForClicks(container, display, numberButtons) {
      container.addEventListener('click', function (event) {
        const button = event.target.closest('button');
        if (!button) return;
  
        const action = button.getAttribute('data-action');
        const value = button.getAttribute('data-value') || button.textContent;
  
        if (action === 'clear') { resetDisplay(display); return; }
        if (action === 'equals') { solve(display); return; }
        if (value === 'SHIFT') { toggleShiftMode(numberButtons); return; }
        addToScreen(display, value);
      });
    }
      
    function resetDisplay(display) {
      display.value = '0';
    }
  
    function addToScreen(display, value) {
      if (display.value === 'Error') display.value = '0';
      if (display.value === '0' && value !== '.') display.value = value;
      else display.value += value;
    }
  
    function solve(display) {
      try {
        const input = display.value.replace(/[X×]/g, '*').replace(/÷/g, '/');
        const answer = Function('"use strict"; return (' + input + ')')();
        if (typeof answer === 'number' && isFinite(answer)) display.value = answer;
        else showError(display);
      } catch (err) {
        showError(display);
      }
    }
  
    function showError(display) {
      display.value = 'Error';
      setTimeout(function () { display.value = '0'; }, 900);
    }
  
    function toggleShiftMode(numberButtons) {
      numberButtons.forEach(function (button) {
        if (!button.dataset.originalValue) {
          button.dataset.originalValue = button.getAttribute('data-value') || button.textContent;
          button.dataset.originalText = button.textContent;
        }
        if (shiftIsOn) {
          button.setAttribute('data-value', button.dataset.originalValue);
          button.textContent = button.dataset.originalText;
        } else {
          const num = parseInt(button.dataset.originalValue, 10);
          const shifted = (num + 5) % 10;
          button.setAttribute('data-value', shifted);
          button.textContent = shifted;
        }
      });
      shiftIsOn = !shiftIsOn;
    }
  
})();
