'use strict';

// Показ карточки объявления
var allPins = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');

var fixPin = function (pin) {
  pin.addEventListener('click', function () {
    for (var i = 0; i < allPins.length; i++) {
      var pinActive = allPins[i];
      pinActive.classList.remove('pin--active');
    }
    pin.classList.add('pin--active');
    dialog.style.display = 'block';
  });
};

for (var i = 0; i < allPins.length; i++) {
  fixPin(allPins[i]);
}

// Скрытие карточки объявления
var dialogClose = document.querySelector('.dialog__close');

dialogClose.addEventListener('click', function () {
  dialog.style.display = 'none';
  for (i = 0; i < allPins.length; i++) {
    var pinActive = allPins[i];
    pinActive.classList.remove('pin--active');
  }
});

// Проверка введенных данных в форме
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

checkInTime.addEventListener ('change', function() {
   if (checkInTime.options[0].selected) {
     checkOutTime.options[0].selected = true;
   } else if (checkInTime.options[1].selected) {
     checkOutTime.options[1].selected = true;
   } else {
     checkOutTime.options[2].selected = true;
   }
});

typeOfAccomodation.addEventListener ('change', function() {
  if (typeOfAccomodation.options[0].selected) {
    pricePerNight.min = 1000;
  } else if (typeOfAccomodation.options[1].selected) {
    pricePerNight.min = 0;
  } else {
    pricePerNight.min = 10000;
  }
});

numberOfRooms.addEventListener ('change', function() {
  if (numberOfRooms.options[0].selected) {
    numberOfGuests.options[1].selected = true;
  } else {
    numberOfGuests.options[0].selected = true;
  }
});
