'use strict';

window.synchronizeFields = (function () {
  return function (field1, field2, array1, array2, cb) {
    field1.addEventListener('change', function () {
      for (var i = 0; i < array1.length; i++) {
        if (field1.value === array1[i]) {
          if (typeof cb === 'function') {
            cb(field2, array2[i]);
          }
        }
      }
    });
    field2.addEventListener('change', function () {
      for (var i = 0; i < array2.length; i++) {
        if (field2.value === array2[i]) {
          if (typeof cb === 'function') {
            cb(field1, array1[i]);
          }
        }
      }
    });
  };
})();
