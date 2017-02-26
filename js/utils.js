'use strict';

window.utils = (function () {

  var ENTER_KEY_CODE = 13;

  // Проверка на тип события
  var eventType = function (event) {
    return (event.keyCode && event.keyCode === ENTER_KEY_CODE) || event.type === 'click';
  };

  var toggleAria = function (element) {
    element.setAttribute('aria-pressed', element.getAttribute('aria-pressed') === 'true'
      ? 'false'
      : 'true'
    );
    element.setAttribute('aria-pressed', element.getAttribute('aria-pressed') === 'true'
      ? 'false'
      : 'true'
    );
  };

  return {
    eventType: eventType,
    toggleAria: toggleAria
  };
})();
