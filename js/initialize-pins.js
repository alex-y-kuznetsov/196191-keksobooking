'use strict';

window.initializePins = (function () {
  return function () {
    var ENTER_KEY_CODE = 13;

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

    // Проверка на тип события
    var eventType = function (event) {
      return (event.keyCode && event.keyCode === ENTER_KEY_CODE) || event.type === 'click';
    };

    // Показ карточки объявления
    var pinMap = document.querySelector('.tokyo__pin-map');
    var dialog = document.querySelector('.dialog');

    var pinDeactivate = function () {
      var pinActive = document.querySelector('.pin--active');
      if (pinActive) {
        pinActive.classList.remove('pin--active');
        toggleAria(pinActive);
      }
    };

    var openDialog = function (event) {
      pinDeactivate();
      event.target.closest('.pin').classList.add('pin--active');
      toggleAria(event.target.closest('.pin'));
      toggleAria(dialog);
      dialog.style.display = 'block';
    };

    var openDialogEventListener = function (event) {
      if (event.target.closest('.pin') && eventType(event)) {
        openDialog(event);
      }
    };

    pinMap.addEventListener('click', openDialogEventListener);
    pinMap.addEventListener('keydown', openDialogEventListener);

    // Скрытие карточки объявления
    var dialogClose = document.querySelector('.dialog__close');

    var closeDialogEventListener = function (evt) {
      if (eventType(evt)) {
        dialog.style.display = 'none';
        toggleAria(dialog);
        pinDeactivate();
      }
    };

    dialogClose.addEventListener('click', closeDialogEventListener);
    dialogClose.addEventListener('keydown', closeDialogEventListener);
  };
})();
