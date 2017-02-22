'use strict';

window.showCard = (function () {

  // Показ карточки объявления
  var dialog = document.querySelector('.dialog');
  var onDialogClose = null;

  var openDialog = function () {
    window.utils.toggleAria(dialog);
    dialog.style.display = 'block';
  };

  // Скрытие карточки объявления
  var dialogClose = document.querySelector('.dialog__close');

  var closeDialog = function (evt) {
    if (window.utils.eventType(evt)) {
      dialog.style.display = 'none';
      window.utils.toggleAria(dialog);
      if (typeof onDialogClose === 'function') {
        onDialogClose();
      }
    }
  };

  dialogClose.addEventListener('click', closeDialog);
  dialogClose.addEventListener('keydown', closeDialog);

  return function (cb) {
    openDialog();
    onDialogClose = cb;
  };
})();
