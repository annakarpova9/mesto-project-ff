import "../pages/index.css";
import {
  createCard,
  likeCard,
  popupTypeDeleteCard,
  clickedCardId,
} from "../components/card.js";
import {
  openModal,
  closeModal,
  closePopupOverlay,
  closePopupCross,
} from "../components/modal.js";
import {
  validationConfig,
  enableValidation,
  clearValidation,
} from "../components/validation.js";
import { apiRequest, catchError } from "../components/api.js";

const cardsContainer = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");

const openPopupEditBtn = document.querySelector(".profile__edit-button");
const openPopupAddBtn = document.querySelector(".profile__add-button");

const formEditProfile = document.forms["edit-profile"];
const nameProfileInput = formEditProfile.elements.name;
const jobProfileInput = formEditProfile.elements.description;

const formAddNewCard = document.forms["new-place"];
const nameCardInput = formAddNewCard.elements["place-name"];
const linkCardInput = formAddNewCard.elements.link;

const formDeleteCard = document.forms["delete-card"];

const formNewAvatar = document.forms.avatar;
const avatarLinkInput = formNewAvatar.elements["avatar-link"];

const profileInfo = document.querySelector(".profile__info");
const profileImage = document.querySelector(".profile__image");
const profileTitle = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");

const fullOpenImage = popupTypeImage.querySelector(".popup__image");
const captionFullOpenImage = popupTypeImage.querySelector(".popup__caption");

//

enableValidation(validationConfig);

// Получение от сервера карточек и пользователя

Promise.all([
  apiRequest({
    url: "cards",
    method: "GET",
  }).then((res) => requestCards(res)),

  apiRequest({
    url: "users/me",
    method: "GET",
  }).then((res) => requestProfile(res)),
]).catch(catchError);

// Вывод информации профиля

function requestProfile(res) {
  profileInfo.dataset.userId = res._id;
  profileImage.style.backgroundImage = `url(${res.avatar})`;
  profileTitle.textContent = res.name;
  profileDescription.textContent = res.about;
}

// Вывод карточек на страницу

function requestCards(res) {
  res.forEach((card) => {
    cardsContainer.append(
      createCard(
        {
          card: card,
          likeCard,
          openModalFullImage,
        },
        profileInfo.dataset.userId
      )
    );
  });
}

// Функция для открытия модального окна с изображением

function openModalFullImage(img, title) {
  fullOpenImage.src = img.src;
  fullOpenImage.alt = img.alt;
  captionFullOpenImage.textContent = title.textContent;
  openModal(popupTypeImage);
}

// Добавление класса для плавной анимации всем модальным окнам

popups.forEach((item) => item.classList.add("popup_is-animated"));

// Закрытие модальных окон по нажатию на крестик и оверлей

popups.forEach((item) => item.addEventListener("mousedown", closePopupOverlay));
popups.forEach((item) => item.addEventListener("click", closePopupCross));

// Обработка клика по кнопкам редактирования профиля, добавления новой карточки и аватара

openPopupEditBtn.addEventListener("click", () => {
  openModal(popupTypeEdit);
  fillFormEditProfile();
  clearValidation(formEditProfile, validationConfig);
});

openPopupAddBtn.addEventListener("click", () => {
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
  renderLoading(true, evt);

  apiRequest({
    url: "users/me",
    method: "PATCH",
    body: {
      name: nameProfileInput.value,
      about: jobProfileInput.value,
    },
  })
    .then((res) => requestProfile(res))
    .catch(catchError)
    .finally(() => renderLoading(false, evt));
  closeModal(popupTypeEdit);
}

formEditProfile.addEventListener("submit", handleFormEditSubmit);

function fillFormEditProfile() {
  nameProfileInput.value = profileTitle.textContent;
  jobProfileInput.value = profileDescription.textContent;
}

// Добавление новой карточки

function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);

  apiRequest({
    url: "cards",
    method: "POST",
    body: {
      name: nameCardInput.value,
      link: linkCardInput.value,
    },
  })
    .then((card) =>
      cardsContainer.append(
        createCard(
          {
            card: card,
            likeCard,
            openModalFullImage,
          },
          profileInfo.dataset.userId
        )
      )
    )
    .catch(catchError)
    .finally(() => renderLoading(false, evt));

  formAddNewCard.reset();
  closeModal(popupTypeNewCard);
}

formAddNewCard.addEventListener("submit", handleFormNewCardSubmit);

// Обновление аватара на сервере

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);

  apiRequest({
    url: "users/me/avatar",
    method: "PATCH",
    body: {
      avatar: avatarLinkInput.value,
    },
  })
    .then((res) => requestProfile(res))
    .catch(catchError)
    .finally(() => renderLoading(false, evt));

  closeModal(popupTypeAvatar);
}

formNewAvatar.addEventListener("submit", handleAvatarSubmit);

// Функция загрузки при ожидании ответа от сервера

function renderLoading(
  isLoading,
  evt,
  btnInitialText = "Сохранить",
  btnloadingText = "Сохранение..."
) {
  const btn = evt.submitter;
  if (isLoading) {
    btn.textContent = btnloadingText;
  } else {
    btn.textContent = btnInitialText;
  }
}

// Удаление карточки при согласии

function handleDeleteCardSubmit(
  evt,
  btnInitialText = "Да",
  btnloadingText = "Удаление..."
) {
  evt.preventDefault();

  renderLoading(true, evt, btnInitialText, btnloadingText);

  apiRequest({
    url: `cards/${clickedCardId}`,
    method: "DELETE",
  })
    .then((card) => {
      card = document.getElementById(clickedCardId);
      card.remove;
    })
    .catch(catchError)
    .finally(() => renderLoading(false, evt, btnInitialText));
  closeModal(popupTypeDeleteCard);
}

formDeleteCard.addEventListener("submit", handleDeleteCardSubmit);
