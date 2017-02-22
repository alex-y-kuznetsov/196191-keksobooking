'use strict';

window.initializePins = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');

  // Деактивация пинов
  var pinDeactivate = function () {
    var pinActive = document.querySelector('.pin--active');
    if (pinActive) {
      pinActive.classList.remove('pin--active');
      window.utils.toggleAria(pinActive);
    }
  };

  var clearPins = function () {
    pinDeactivate();
    event.target.closest('.pin').classList.add('pin--active');
    window.utils.toggleAria(event.target.closest('.pin'));
  };

  pinMap.addEventListener('click', function (event) {
    if (event.target.closest('.pin')) {
      clearPins();
      window.showCard(function () {
        pinDeactivate();
      });
    }
  });
  pinMap.addEventListener('keydown', function (event) {
    if (event.target.closest('.pin') && window.utils.eventType(event)) {
      clearPins();
      window.showCard(function () {
        document.querySelector('.pin--active img').focus();
        pinDeactivate();
      });
    }
  });
})();
