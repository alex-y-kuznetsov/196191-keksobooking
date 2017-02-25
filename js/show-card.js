'use strict';

window.showCard = (function () {

  // Показ карточки объявления
  var tokyo = document.querySelector('.tokyo');
  var onDialogClose = null;
  var dialogToClone = document.querySelector('.dialog');
  var newDialogElement = dialogToClone.cloneNode(true);
  var dialogImage = newDialogElement.querySelector('img');
  var dialogTitle = newDialogElement.querySelector('.lodge__title');
  var dialogAddress = newDialogElement.querySelector('.lodge__address');
  var dialogPrice = newDialogElement.querySelector('.lodge__price');
  var dialogType = newDialogElement.querySelector('.lodge__type');
  var dialogRoomsAndGuests = newDialogElement.querySelector('.lodge__rooms-and-guests');
  var dialogCheckIn = newDialogElement.querySelector('.lodge__checkin-time');
  var dialogFeatures = newDialogElement.querySelector('.lodge__features');
  var dialogDescription = newDialogElement.querySelector('.lodge__description');
  var dialogPhotos = newDialogElement.querySelector('.lodge__photos');

  dialogToClone.style.display = 'none';
  newDialogElement.style.display = 'none';

  var openDialog = function (data) {
    window.utils.toggleAria(newDialogElement);
    newDialogElement.style.display = 'block';

    dialogImage.setAttribute('src', data.author.avatar);
    dialogImage.setAttribute('alt', 'Avatar');
    dialogTitle.innerText = data.offer.title;
    dialogAddress.innerText = data.offer.address;
    dialogPrice.innerText = data.offer.price;
    dialogType.innerText = data.offer.type;
    dialogRoomsAndGuests.innertext = data.offer.rooms + 'комнаты для ' + data.offer.guests + 'гостей.';
    dialogCheckIn.innertext = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
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

    tokyo.appendChild(newDialogElement);

  };

  // Скрытие карточки объявления
  var dialogClose = newDialogElement.querySelector('.dialog__close');

  var closeDialog = function (evt) {
    if (window.utils.eventType(evt)) {
      newDialogElement.style.display = 'none';
      window.utils.toggleAria(newDialogElement);
      if (typeof onDialogClose === 'function') {
        onDialogClose();
      }
    }
  };

  dialogClose.addEventListener('click', closeDialog);
  dialogClose.addEventListener('keydown', closeDialog);

  return function (data, cb) {
    openDialog(data);
    onDialogClose = cb;
  };
})();
