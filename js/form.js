'use strict';

(function () {

  window.initializePins();

  // Проверка введенных данных
  var adTitle = document.getElementById('title');
  var pricePerNight = document.getElementById('price');
  var address = document.getElementById('address');

  adTitle.required = true;
  adTitle.maxLength = 100;
  adTitle.minLength = 30;
  pricePerNight.required = true;
  pricePerNight.type = 'number';
  pricePerNight.min = 1000;
  pricePerNight.max = 1000000;
  address.required = true;

  // Корректировка полей формы
  var checkInTime = document.getElementById('time');
  var checkOutTime = document.getElementById('timeout');
  var typeOfAccomodation = document.getElementById('type');
  var numberOfRooms = document.getElementById('room_number');
  var numberOfGuests = document.getElementById('capacity');

  var checkInTimeArray = ['>12', '>13', '>14'];
  var checkOutTimeArray = ['<12', '<13', '<14'];
  var typeOfAccomodationArray = ['flat', 'shack', 'palace'];
  var pricePerNightArray = ['1000', '0', '10000'];
  var numberOfRoomsArray = ['1 room', '2 rooms', '100 rooms'];
  var numberOfGuestsArray = ['0 guests', '3 guests', '3 guests'];

  var syncValues = function (element, value) {
    element.value = value;
  };
  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  window.synchronizeFields(checkInTime, checkOutTime, checkInTimeArray, checkOutTimeArray, syncValues);
  window.synchronizeFields(typeOfAccomodation, pricePerNight, typeOfAccomodationArray, pricePerNightArray, syncValueWithMin);
  window.synchronizeFields(numberOfRooms, numberOfGuests, numberOfRoomsArray, numberOfGuestsArray, syncValues);
})();
