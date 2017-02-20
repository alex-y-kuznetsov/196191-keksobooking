'use strict';

window.showCard = (function () {

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

  // Скрытие карточки объявления
  var dialogClose = document.querySelector('.dialog__close');

  var closeDialog = function (evt) {
    if (window.initializePins.eventType(evt)) {
      dialog.style.display = 'none';
      window.initializePins.toggleAria(dialog);
      if (typeof onDialogClose === 'function') {
        onDialogClose();
      }
      // window.initializePins.pinDeactivate();
    }
  };

  dialogClose.addEventListener('click', closeDialog);
  dialogClose.addEventListener('keydown', closeDialog);

  return function (cb) {
    openDialog(event);
    onDialogClose = cb;
  };
})();
