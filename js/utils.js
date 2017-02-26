'use strict';

window.utils = (function () {

  var ENTER_KEY_CODE = 13;

  // Проверка на тип события
  var eventType = function (event) {
    return (event.keyCode && event.keyCode === ENTER_KEY_CODE) || event.type === 'click';
  };

  var toggleAria = function (element) {
    (element.getAttribute('aria-pressed') === 'true') ? element.setAttribute('aria-pressed', 'false') : element.setAttribute('aria-pressed', 'true');
    (element.getAttribute('aria-hidden') === 'true') ? element.setAttribute('aria-hidden', 'false') : element.setAttribute('aria-hidden', 'true');
  };

  return {
    eventType: eventType,
    toggleAria: toggleAria
  };
})();
