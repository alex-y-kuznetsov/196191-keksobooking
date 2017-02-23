'use strict';

window.initializePins = (function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var similarApartments = [];

  // Поиск похожих объявлений
  var getData = function () {
    window.load(DATA_URL, function (data) {
      similarApartments = data;
    });
    return similarApartments;
  };

  // Отрисовка клона
  var drawClonePin = function (data) {
    var templateElement = document.querySelector('#pin-template');
    var elementToClone = templateElement.content.querySelector('.element-to-clone');
    var newElement = elementToClone.cloneNode(true);
    var avatar = newElement.querySelector('img');

    avatar.src = data.author.avatar;
    newElement.style.left = data.location.x + 'px';
    newElement.style.top = data.location.y + 'px';
    newElement.setAttribute('tabindex', 0);

    return newElement;
  };

  // Отрисовка похожих объявлений
  var drawSimilarApartments = function () {
    var slicedApartmentsArray = similarApartments.slice(0, 3);

    slicedApartmentsArray.forEach(function (item) {
      pinMap.appendChild(drawClonePin(item));
    });
  };
  drawSimilarApartments();

  // Очистка пинов
  var clearPins = function () {
    var pinActive = document.querySelector('.pin--active');
    if (pinActive) {
      pinActive.classList.remove('pin--active');
      window.utils.toggleAria(pinActive);
    }
  };

  // Активация пинов
  var activatePin = function (pin) {
    if (pin) {
      clearPins();
      pin.classList.add('pin--active');
      window.utils.toggleAria(pin);
    }
  };

  pinMap.addEventListener('click', function (event) {
    activatePin(event.target.closest('.pin'));
    window.showCard(function () {
      clearPins();
    });
  });
  pinMap.addEventListener('keydown', function (event) {
    if (window.utils.eventType(event)) {
      activatePin(event.target.closest('.pin'));
      window.showCard(function () {
        document.querySelector('.pin--active img').focus();
        clearPins();
      });
    }
  });
})();
