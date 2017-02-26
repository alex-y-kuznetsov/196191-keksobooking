'use strict';

window.load = (function () {

  return function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var errorHandler = function (err) {

      if (typeof onError === 'function') {
        onError(err);
      }
    };

    xhr.addEventListener('load', function (evt) {
      if (evt.target.status >= 400) {
        errorHandler('Failed to load data. Server returned status: ' + evt.target.status);
      } else if (evt.target.status >= 200) {
        onLoad(evt.target.response);
      }
    });
    xhr.addEventListener('error', errorHandler);
    xhr.addEventListener('timeout', errorHandler);

    xhr.responseType = 'json';

    xhr.open('GET', url);
    xhr.send();
  };
})();
