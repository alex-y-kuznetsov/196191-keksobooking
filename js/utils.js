'use strict';

window.utils = (function () {

  var ENTER_KEY_CODE = 13;

  // Проверка на тип события
  var eventType = function (event) {
    return (event.keyCode && event.keyCode === ENTER_KEY_CODE) || event.type === 'click';
  };

  // Изменение статуса aria-pressed и aria-hidden
  var toggleAria = function (element) {
    if (element.getAttribute('aria-pressed') === 'true') {
      element.setAttribute('aria-pressed', 'false');
    } else {
      element.setAttribute('aria-pressed', 'true');
    }
    if (element.getAttribute('aria-hidden') === 'true') {
      element.setAttribute('aria-hidden', 'false');
    } else {
      element.setAttribute('aria-hidden', 'true');
    }
  };

  return {
    eventType: eventType,
    toggleAria: toggleAria
  };
})();
