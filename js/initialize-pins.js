'use strict';

window.initializePins = function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var similarApartments = [];
  var currentApartments = [];

  // Поиск похожих объявлений
  var getData = function () {
    window.load(DATA_URL, function (data) {
      similarApartments = data;
      var slicedApartmentsArray = similarApartments.slice(0, 3);
      drawSimilarApartments(slicedApartmentsArray);
    });
    return similarApartments;
  };
  getData();

  // Отрисовка клона
  var drawClonePin = function (index, data) {
    var pinTemplateElement = document.querySelector('#pin-template');
    var pinElementToClone = pinTemplateElement.content.querySelector('.element-to-clone');
    var newPinElement = pinElementToClone.cloneNode(true);
    newPinElement.dataset.index = index;
    var avatar = newPinElement.querySelector('img');

    avatar.src = data.author.avatar;
    newPinElement.style.left = data.location.x + 'px';
    newPinElement.style.top = data.location.y + 'px';
    avatar.setAttribute('tabindex', 0);
    newPinElement.classList.add('pin');

    pinMap.addEventListener('click', pinClickHandler);
    pinMap.addEventListener('keydown', pinEnterKeyHandler);

    return newPinElement;
  };

  var drawSimilarApartments = function (arr) {  // new
    currentApartments = arr;
    arr.forEach(function (item, index) {
      pinMap.appendChild(drawClonePin(index, item));
    });
  };

  // Очистка пинов
  var clearPins = function () {
    var pinActive = document.querySelector('.pin--active');
    if (pinActive) {
      pinActive.classList.remove('pin--active');
      window.utils.togglePressed(pinActive);
    }
  };

  // Активация пинов
  var activatePin = function (pin) {
    if (pin) {
      clearPins();
      pin.classList.add('pin--active');
      window.utils.togglePressed(pin);
    }
  };

  var tokyo = document.querySelector('.tokyo');
  var tokyoFilters = document.querySelector('.tokyo__filters');
  var housingType = tokyoFilters.querySelector('#housing_type');
  var housingPrice = tokyoFilters.querySelector('#housing_price');
  var housingRooms = tokyoFilters.querySelector('#housing_room-number');
  var housingGuests = tokyoFilters.querySelector('#housing_guests-number');
  var housingFeaturesCheckboxes = tokyoFilters.querySelectorAll('#housing_features input[type=checkbox]');

  var ANY_VALUE = 'any';

  // Очитска пинов перед фильтрами
  var clearTokyo = function () {
    var pins = tokyo.querySelectorAll('.pin');
    clearPins();
    pins.forEach(function (item) {
      if (!item.classList.contains('pin__main')) {
        pinMap.removeChild(item);
      }
    });
    pinMap.removeEventListener('click', pinClickHandler);
    pinMap.removeEventListener('keydown', pinEnterKeyHandler);
  };

  var isInRange = function (filterValue, dataValue) {
    return (filterValue === ANY_VALUE) || (filterValue === dataValue);
  };

  var isInRangePrice = function (item) {
    if (housingPrice.value === 'low') {
      return item.offer.price < 10000;
    } else if (housingPrice.value === 'middle') {
      return item.offer.price >= 10000 && item.offer.price <= 50000;
    } else if (housingPrice.value === 'hight') {
      return item.offer.price > 50000;
    } else {
      return false;
    }
  };

  var isInRangeFeatures = function (data) {

    var isCheckedFeature = function (feature) {
      return feature.checked;
    };

    var getFeatureValue = function (feature) {
      return feature.value;
    };

    var checkedFeatures = [].filter.call(housingFeaturesCheckboxes, isCheckedFeature).map(getFeatureValue);
    var apartmentFeatures = data.offer.features;

    var checkFeatures = function (feature) {
      return apartmentFeatures.indexOf(feature) !== -1;
    };

    return (checkedFeatures.length === 0) || (checkedFeatures.every(checkFeatures));
  };

  var applyApartmentFilters = function (item) {
    return isInRange(housingType.value, item.offer.type.toString()) &&
      isInRangePrice(item) &&
      isInRange(housingRooms.value, item.offer.rooms.toString()) &&
      isInRange(housingGuests.value, item.offer.guests.toString()) &&
      isInRangeFeatures(item);
  };

  var pinClickHandler = function (event) {
    var pinDataIndex = event.target.closest('.pin').dataset.index;
    activatePin(event.target.closest('.pin'));
    if (pinDataIndex) {
      window.showCard(currentApartments[pinDataIndex], function () {
        clearPins();
      });
    }
  };
  var pinEnterKeyHandler = function (event) {
    var pinDataIndex = event.target.closest('.pin').dataset.index;
    if (window.utils.eventType(event)) {
      activatePin(event.target.closest('.pin'));
      if (pinDataIndex) {
        window.showCard(currentApartments[pinDataIndex], function () {
          document.querySelector('.pin--active img').focus();
          clearPins();
        });
      }
    }
  };

  // Обновление пинов
  tokyoFilters.addEventListener('change', function () {
    clearTokyo(pinMap);
    drawSimilarApartments(similarApartments.filter(applyApartmentFilters));
  });
};
