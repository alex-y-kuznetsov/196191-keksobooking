'use strict';

window.showCard = (function () {

  var ENTER_KEY_CODE = 13;

  // Проверка на тип события
  var eventType = function (event) {
    return (event.keyCode && event.keyCode === ENTER_KEY_CODE) || event.type === 'click';
  };

  // Показ карточки объявления
  var dialog = document.querySelector('.dialog');
  var onDialogClose = null;

  var openDialog = function (event) {
    window.initializePins.pinDeactivate();
    event.target.closest('.pin').classList.add('pin--active');
    window.initializePins.toggleAria(event.target.closest('.pin'));
    window.initializePins.toggleAria(dialog);
    dialog.style.display = 'block';
  };

  var openDialogEventListener = function (event) {
    if (event.target.closest('.pin') && eventType(event)) {
      openDialog(event);
    }
  };

  // Скрытие карточки объявления
  var dialogClose = document.querySelector('.dialog__close');

  var closeDialogEventListener = function (evt) {
    if (eventType(evt)) {
      dialog.style.display = 'none';
      window.initializePins.toggleAria(dialog);
      if (typeof onDialogClose === 'function') {
        onDialogClose();
      };
      window.initializePins.pinDeactivate();
    }
  };

  dialogClose.addEventListener('click', closeDialogEventListener);
  dialogClose.addEventListener('keydown', closeDialogEventListener);

  return {
    openDialogEventListener: openDialogEventListener,
    closeDialogEventListener: closeDialogEventListener,
    eventType: eventType
  };

  return function (cb) {
    openDialog();
    onDialogClose = cb;
  };
})();
