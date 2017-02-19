'use strict';

window.initializePins = (function () {
  var pinMain = document.querySelector('.pin__main');
  var pinMap = document.querySelector('.tokyo__pin-map');

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

  pinMap.addEventListener('click', window.showCard.openDialogEventListener);
  pinMap.addEventListener('keydown', window.showCard.openDialogEventListener);
  pinMap.addEventListener('keydown', function (evt) {
    if (window.showCard.eventType(evt)) {
      window.showCard(function () {
        pinMain.focus();
      })
    }
  });

  return {
    pinDeactivate: pinDeactivate,
    toggleAria: toggleAria
  };
})();
