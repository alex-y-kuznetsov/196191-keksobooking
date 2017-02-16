'use strict';

var ENTER_KEY_CODE = 13;

// Изменение статуса aria-pressed и aria-hidden
var toggleAria = function (element) {
  var ariaPressed = (element.getAttribute('aria-pressed') === 'true');
  if (ariaPressed) {
    element.setAttribute('aria-pressed', 'false');
  } else {
    element.setAttribute('aria-pressed', 'true');
  }
  var ariaHidden = (element.getAttribute('aria-hidden') === 'true');
  if (ariaHidden) {
    element.setAttribute('aria-hidden', 'false');
  } else {
    element.setAttribute('aria-hidden', 'true');
  }
};

// Проверка на тип события
var eventType = function (event) {
  return (event.keyCode && event.keyCode === ENTER_KEY_CODE) || event.type === 'click';
};

// Показ карточки объявления
var pinMap = document.querySelector('.tokyo__pin-map');
var dialog = document.querySelector('.dialog');

var pinDeactivate = function () {
  var pinActive = document.querySelector('.pin--active');
  if (pinActive) {
    pinActive.classList.remove('pin--active');
    toggleAria(pinActive);
  }
};

var openDialog = function (event) {
  pinDeactivate();
  event.target.closest('.pin').classList.add('pin--active');
  toggleAria(event.target.closest('.pin'));
  toggleAria(dialog);
  dialog.style.display = 'block';
};

var openDialogEventListener = function (event) {
  if (event.target.closest('.pin') && eventType(event)) {
    openDialog(event);
  }
};

pinMap.addEventListener('click', openDialogEventListener);
pinMap.addEventListener('keydown', openDialogEventListener);

// Скрытие карточки объявления
var dialogClose = document.querySelector('.dialog__close');

var closeDialogEventListener = function (evt) {
  if (eventType(evt)) {
    dialog.style.display = 'none';
    toggleAria(dialog);
    pinDeactivate();
  }
};

dialogClose.addEventListener('click', closeDialogEventListener);
dialogClose.addEventListener('keydown', closeDialogEventListener);

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

checkInTime.addEventListener('change', function () {
  if (checkInTime.options[0].selected) {
    checkOutTime.options[0].selected = true;
  } else if (checkInTime.options[1].selected) {
    checkOutTime.options[1].selected = true;
  } else {
    checkOutTime.options[2].selected = true;
  }
});

checkOutTime.addEventListener('change', function () {
  if (checkOutTime.options[0].selected) {
    checkInTime.options[0].selected = true;
  } else if (checkOutTime.options[1].selected) {
    checkInTime.options[1].selected = true;
  } else {
    checkInTime.options[2].selected = true;
  }
});

typeOfAccomodation.addEventListener('change', function () {
  if (typeOfAccomodation.options[0].selected) {
    pricePerNight.min = 1000;
  } else if (typeOfAccomodation.options[1].selected) {
    pricePerNight.min = 0;
  } else {
    pricePerNight.min = 10000;
  }
});

numberOfRooms.addEventListener('change', function () {
  if (numberOfRooms.options[0].selected) {
    numberOfGuests.options[1].selected = true;
  } else {
    numberOfGuests.options[0].selected = true;
  }
});
