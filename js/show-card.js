'use strict';

window.showCard = (function () {

  // Показ карточки объявления
  var onDialogClose = null;
  var dialog = document.querySelector('.dialog');
  var dialogImage = dialog.querySelector('img');
  var dialogTitle = dialog.querySelector('.lodge__title');
  var dialogAddress = dialog.querySelector('.lodge__address');
  var dialogPrice = dialog.querySelector('.lodge__price');
  var dialogType = dialog.querySelector('.lodge__type');
  var dialogRoomsAndGuests = dialog.querySelector('.lodge__rooms-and-guests');
  var dialogCheckIn = dialog.querySelector('.lodge__checkin-time');
  var dialogFeatures = dialog.querySelector('.lodge__features');
  var dialogDescription = dialog.querySelector('.lodge__description');
  var dialogPhotos = dialog.querySelector('.lodge__photos');
  var dialogIsOpen = false;

  dialog.style.display = 'none';
  window.utils.toggleAria('aria-hidden', dialog);

  var openDialog = function (data) {
    if (!dialogIsOpen) {
      window.utils.toggleAria('aria-hidden', dialog);
      dialogIsOpen = true;
    }
    dialog.style.display = 'block';

    dialogImage.setAttribute('src', data.author.avatar);
    dialogImage.setAttribute('alt', 'Avatar');
    dialogTitle.innerText = data.offer.title;
    dialogAddress.innerText = data.offer.address;
    dialogPrice.innerText = data.offer.price;
    dialogType.innerText = data.offer.type;
    dialogRoomsAndGuests.innerText = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей.';
    dialogCheckIn.innerText = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    dialogDescription.innerText = data.offer.description;
    dialogFeatures.innerHTML = '';
    dialogPhotos.innerHTML = '';

    data.offer.features.forEach(function (item) {
      var featureElement = document.createElement('span');
      featureElement.classList.add('feature__image');
      featureElement.classList.add('feature__image--' + item);
      dialogFeatures.appendChild(featureElement);
    });

    data.offer.photos.forEach(function (item) {
      var imageElement = document.createElement('img');
      imageElement.setAttribute('width', 52);
      imageElement.setAttribute('height', 42);
      imageElement.src = item;
      dialogPhotos.appendChild(imageElement);
    });
  };

  // Скрытие карточки объявления
  var dialogCloseBtn = dialog.querySelector('.dialog__close');

  var closeDialogHandler = function (evt) {
    if (window.utils.eventType(evt)) {
      dialog.style.display = 'none';
      window.utils.toggleAria('aria-hidden', dialog);
      if (typeof onDialogClose === 'function') {
        onDialogClose();
      }
    }
    dialogIsOpen = false;
  };

  dialogCloseBtn.addEventListener('click', closeDialogHandler);
  dialogCloseBtn.addEventListener('keydown', closeDialogHandler);

  return function (data, cb) {
    openDialog(data);
    onDialogClose = cb;
  };
})();
