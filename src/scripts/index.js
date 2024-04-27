import "../pages/index.css";
import { createCard, likeCard } from "../components/card.js";
import {
  openModal,
  closeModal,
  closePopupOverlay,
  closePopupCross,
} from "../components/modal.js";
import {
  validationConfig,
  showInputError,
  hideInputError,
  enableValidation,
  clearValidation,
} from "../components/validation.js";
import { apiRequest, catchError } from "../components/api.js";

const containerCards = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const popupTypeDeleteCard = document.querySelector(".popup_type_delete-card");

const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const buttonOpenPopupAddCard = document.querySelector(".profile__add-button");

const formEditProfile = document.forms["edit-profile"];
const inputNameProfile = formEditProfile.elements.name;
const inputDescriptionProfile = formEditProfile.elements.description;

const formAddNewCard = document.forms["new-place"];
const inputNameCard = formAddNewCard.elements["place-name"];
const inputLinkCard = formAddNewCard.elements.link;

const formDeleteCard = document.forms["delete-card"];

const formNewAvatar = document.forms.avatar;
const inputLinkAvatar = formNewAvatar.elements["avatar-link"];

const profileInfo = document.querySelector(".profile__info");
const profileImage = document.querySelector(".profile__image");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");

const buttonOpenFullImage = popupTypeImage.querySelector(".popup__image");
const captionFullImage = popupTypeImage.querySelector(".popup__caption");

let idClickedCard = "0";

//

enableValidation(validationConfig);

// Получение от сервера карточек и пользователя

Promise.all([
  apiRequest({
    url: "cards",
    method: "GET",
  }),

  apiRequest({
    url: "users/me",
    method: "GET",
  }),
])
  .then(([infoCards, infoProfile]) => {
    setDataProfile(infoProfile);
    setDataCards(infoCards, infoProfile._id);
  })
  .catch(catchError);

// Вывод информации профиля

function setDataProfile(res) {
  profileInfo.dataset.userId = res._id;
  profileImage.style.backgroundImage = `url(${res.avatar})`;
  profileTitle.textContent = res.name;
  profileDescription.textContent = res.about;
}

// Вывод карточек на страницу

function setDataCards(res, ownerId) {
  res.forEach((card) => {
    containerCards.append(
      createCard(
        {
          card: card,
          likeCard,
          openModalFullImage,
          clickButtonDeleteCard,
        },
        ownerId
      )
    );
  });
}

// Функция для открытия модального окна с изображением

function openModalFullImage(img, title) {
  buttonOpenFullImage.src = img.src;
  buttonOpenFullImage.alt = img.alt;
  captionFullImage.textContent = title.textContent;
  openModal(popupTypeImage);
}

// Добавление класса для плавной анимации всем модальным окнам

popups.forEach((item) => item.classList.add("popup_is-animated"));

// Закрытие модальных окон по нажатию на крестик и оверлей

popups.forEach((item) => item.addEventListener("mousedown", closePopupOverlay));
popups.forEach((item) => item.addEventListener("click", closePopupCross));

// Обработка клика по кнопкам редактирования профиля, добавления новой карточки и аватара

buttonOpenPopupProfile.addEventListener("click", () => {
  openModal(popupTypeEdit);
  fillFormEditProfile();
  clearValidation(formEditProfile, validationConfig);
});

buttonOpenPopupAddCard.addEventListener("click", () => {
  formAddNewCard.reset();
  openModal(popupTypeNewCard);
  clearValidation(formAddNewCard, validationConfig);
});

profileImage.addEventListener("click", () => {
  formNewAvatar.reset();
  openModal(popupTypeAvatar);
  clearValidation(popupTypeAvatar, validationConfig);
});

// Обработка события sumbit для модального окна редактирования профиля

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt, "Сохранение...");

  apiRequest({
    url: "users/me",
    method: "PATCH",
    body: {
      name: inputNameProfile.value,
      about: inputDescriptionProfile.value,
    },
  })
    .then((res) => {
      setDataProfile(res);
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      showInputError(
        formEditProfile,
        inputDescriptionProfile,
        `Ошибка сервера: ${err}`,
        validationConfig
      );
    })
    .finally(() => renderLoading(evt));
}

formEditProfile.addEventListener("submit", handleFormEditSubmit);

function fillFormEditProfile() {
  inputNameProfile.value = profileTitle.textContent;
  inputDescriptionProfile.value = profileDescription.textContent;
}

// Добавление новой карточки

function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt, "Сохранение...");

  apiRequest({
    url: "cards",
    method: "POST",
    body: {
      name: inputNameCard.value,
      link: inputLinkCard.value,
    },
  })
    .then((card) => {
      containerCards.prepend(
        createCard(
          {
            card: card,
            likeCard,
            openModalFullImage,
            clickButtonDeleteCard,
          },
          profileInfo.dataset.userId
        )
      );
      formAddNewCard.reset();
      closeModal(popupTypeNewCard);
    })
    .catch((err) => {
      showInputError(
        formAddNewCard,
        inputLinkCard,
        `Ошибка сервера: ${err}`,
        validationConfig
      );
    })
    .finally(() => renderLoading(evt));
}

formAddNewCard.addEventListener("submit", handleFormNewCardSubmit);

// Обновление аватара на сервере

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt, "Сохранение...");

  apiRequest({
    url: "users/me/avatar",
    method: "PATCH",
    body: {
      avatar: inputLinkAvatar.value,
    },
  })
    .then((res) => {
      setDataProfile(res);
      closeModal(popupTypeAvatar);
    })
    .catch((err) => {
      showInputError(
        formNewAvatar,
        inputLinkAvatar,
        `Ошибка сервера: ${err}`,
        validationConfig
      );
    })
    .finally(() => renderLoading(evt));
}

formNewAvatar.addEventListener("submit", handleAvatarSubmit);

// Функция загрузки при ожидании ответа от сервера

function renderLoading(evt, buttonText = "Сохранить") {
  const button = evt.submitter;
  button.textContent = buttonText;
}

// Обработчика нажатия на кнопку удаления

function clickButtonDeleteCard(deleteButton, card, cardElement) {
  deleteButton.addEventListener("click", () => {
    idClickedCard = card._id;
    cardElement.id = idClickedCard;
    openModal(popupTypeDeleteCard);
  });
}

// Удаление карточки при согласии

function handleDeleteCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt, "Удаление...");

  apiRequest({
    url: `cards/${idClickedCard}`,
    method: "DELETE",
  })
    .then((card) => {
      card = document.getElementById(idClickedCard);
      card.remove();
      closeModal(popupTypeDeleteCard);
    })
    .catch((err) => {
      const errorMessage = document.querySelector(".delete-card-error");
      errorMessage.textContent = `Ошибка сервера: ${err}`;
      errorMessage.classList.add(validationConfig.errorClass);
    })
    .finally(() => renderLoading(evt, "Да"));
}

formDeleteCard.addEventListener("submit", handleDeleteCardSubmit);
