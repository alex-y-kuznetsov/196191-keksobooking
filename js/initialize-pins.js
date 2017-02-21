'use strict';

window.initializePins = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var ENTER_KEY_CODE = 13;

  // Проверка на тип события
  var eventType = function (event) {
    return (event.keyCode && event.keyCode === ENTER_KEY_CODE) || event.type === 'click';
  };

  // Изменение статуса aria-pressed и aria-hidden
  var toggleAria = function (element) {
    var ariaPressed = (element.getAttribute('aria-pressed') === 'true');
    if (ariaPressed) {
      element.setAttribute('aria-pressed', 'false');
    } else {
      element.setAttribute('aria-pressed', 'true');
    }
    var ariaHidden = (element.getAttribute('aria-hidden') === 'true');
    if (ariaHidden) {
      element.setAttribute('aria-hidden', 'false');
    } else {
      element.setAttribute('aria-hidden', 'true');
    }
  };

  // Деактивация пинов
  var pinDeactivate = function () {
    var pinActive = document.querySelector('.pin--active');
    if (pinActive) {
      pinActive.classList.remove('pin--active');
      toggleAria(pinActive);
    }
  };

  pinMap.addEventListener('click', function (event) {
    if (event.target.closest('.pin')) {
      pinDeactivate();
      window.showCard(function () {
        pinDeactivate();
      });
    }
  });
  pinMap.addEventListener('keydown', function (event) {
    if (event.target.closest('.pin') && eventType(event)) {
      pinDeactivate();
      window.showCard(function () {
        document.querySelector('.pin--active img').focus();
        pinDeactivate();
      });
    }
  });

  return {
    pinDeactivate: pinDeactivate,
    toggleAria: toggleAria,
    eventType: eventType
  };
})();
