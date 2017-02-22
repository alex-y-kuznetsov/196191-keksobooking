'use strict';

window.initializePins = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');

  // Очистка пинов
  var clearPins = function () {
    var pinActive = document.querySelector('.pin--active');
    if (pinActive) {
      pinActive.classList.remove('pin--active');
      window.utils.toggleAria(pinActive);
    }
  };

  // Активация пинов
  var activatePin = function (pin) {
    clearPins();
    pin.classList.add('pin--active');
    window.utils.toggleAria(pin);
  };

  pinMap.addEventListener('click', function (event) {
    activatePin(event.target.closest('.pin'));
    window.showCard(function () {
      clearPins();
    });
  });
  pinMap.addEventListener('keydown', function (event) {
    if (window.utils.eventType(event)) {
      activatePin(event.target.closest('.pin'));
      window.showCard(function () {
        document.querySelector('.pin--active img').focus();
        clearPins();
      });
    }
  });
})();
