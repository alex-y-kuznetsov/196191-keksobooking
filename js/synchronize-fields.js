'use strict';

window.synchronizeFields = (function () {
  return function (field1, field2, array1, array2, cb) {
    field1.addEventListener('change', function () {
      if (typeof cb === 'function') {
        cb(field2, array2[array1.indexOf(field1.value)]);
      }
    });
    field2.addEventListener('change', function () {
      if (typeof cb === 'function') {
        cb(field1, array1[array2.indexOf(field2.value)]);
      }
    });
  };
})();
