'use strict';

window.initializePins = function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var similarApartments = [];

  // Поиск похожих объявлений
  var getData = function () {
    window.load(DATA_URL, function (data) {
      similarApartments = data;
      drawSimilarApartments(); // Функция орисовывает 3 первых пина из массива similarApartments
    });
    return similarApartments;
  };
  getData();

  // Отрисовка клона
  var drawClonePin = function (data) {
    var templateElement = document.querySelector('#pin-template');
    var elementToClone = templateElement.content.querySelector('.element-to-clone');
    var newElement = elementToClone.cloneNode(true);
    newElement.dataset.pin = JSON.stringify(data);
    var avatar = newElement.querySelector('img');

    avatar.src = data.author.avatar;
    newElement.style.left = data.location.x + 'px';
    newElement.style.top = data.location.y + 'px';
    avatar.setAttribute('tabindex', 0);

    return newElement;
  };

  // Отрисовка похожих объявлений
  var drawSimilarApartments = function (arr) { // Принимает на вход массив, нужно для отрисовки пинов по фильтрам
    var slicedApartmentsArray = similarApartments.slice(0, 3);

    slicedApartmentsArray.forEach(function (item) {
      pinMap.appendChild(drawClonePin(item));
    });
  };

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
    var pinData = event.target.closest('.pin').dataset.pin;
    activatePin(event.target.closest('.pin'));
    if (pinData) {
      window.showCard(JSON.parse(event.target.closest('.pin').dataset.pin), function () {
        clearPins();
      });
    }
  });
  pinMap.addEventListener('keydown', function (event) {
    var pinData = event.target.closest('.pin').dataset.pin;
    if (window.utils.eventType(event)) {
      activatePin(event.target.closest('.pin'));
      if (pinData) {
        window.showCard(JSON.parse(event.target.closest('.pin').dataset.pin), function () {
          document.querySelector('.pin--active img').focus();
          clearPins();
        });
      }
    }
  });

};
