'use strict';

window.synchronizeFields = function (field1, field2, array1, array2, property) {
  field1.addEventListener('change', function () {
    field2[property] = array2[array1.indexOf(field1.value)];
  });
  field2.addEventListener('change', function () {
    field1[property] = array1[array2.indexOf(field2.value)];
  });
};
