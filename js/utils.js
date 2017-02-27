'use strict';

window.utils = (function () {

  var ENTER_KEY_CODE = 13;

  // Проверка на тип события
  var eventType = function (event) {
    return (event.keyCode && event.keyCode === ENTER_KEY_CODE) || event.type === 'click';
  };

  // Изменение ARIA-ролей
  var toggleAria = function (attribute, element) {
    element.setAttribute(attribute, element.getAttribute(attribute) === 'true'
      ? 'false'
      : 'true'
    );
  };

  return {
    eventType: eventType,
    toggleAria: toggleAria
  };
})();
