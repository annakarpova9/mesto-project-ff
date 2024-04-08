import "../pages/index.css";
import { initialCards } from "../scripts/cards.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import {
  openModal,
  openModalFullImage,
  closeModal,
  closePopupOverlay,
  closePopupCross,
} from "../components/modal.js";

export const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

const popupMainClass = document.querySelectorAll(".popup");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
export const popupTypeImage = document.querySelector(".popup_type_image");

export const fullOpenImage = popupTypeImage.querySelector(".popup__image");
export const captionFullOpenImage =
  popupTypeImage.querySelector(".popup__caption");

const openPopupEditBtn = document.querySelector(".profile__edit-button");
const openPopupAddBtn = document.querySelector(".profile__add-button");

const formEditProfile = document.forms["edit-profile"];
const nameProfileInput = formEditProfile.elements.name;
const jobProfileInput = formEditProfile.elements.description;

const formAddNewCard = document.forms["new-place"];
const nameCardInput = formAddNewCard.elements["place-name"];
const linkCardInput = formAddNewCard.elements.link;

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Вывод карточек на страницу

initialCards.forEach((item) => {
  const card = createCard({
    card: item,
    deleteCard,
    likeCard,
    openModalFullImage,
  });
  cardsContainer.append(card);
});

// Добавление класса для плавной анимации всем модальным окнам

popupMainClass.forEach((item) => item.classList.add("popup_is-animated"));

// Закрытие модальных окон по нажатию на крестик и оверлей

popupMainClass.forEach((item) =>
  item.addEventListener("click", closePopupOverlay)
);
popupMainClass.forEach((item) =>
  item.addEventListener("click", closePopupCross)
);

// Обработка клика по кнопкам редактирования профиля и добавления новой карточки

openPopupEditBtn.addEventListener("click", () => {
  openModal(popupTypeEdit);
  fillFormEditProfile();
});

openPopupAddBtn.addEventListener("click", () => openModal(popupTypeNewCard));

// Обработка события sumbit для модального окна редактирования профиля

function handleFormEditSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameProfileInput.value;
  profileDescription.textContent = jobProfileInput.value;

  closeModal(popupTypeEdit);
}

formEditProfile.addEventListener("submit", handleFormEditSubmit);

function fillFormEditProfile() {
  nameProfileInput.value = profileTitle.textContent;
  jobProfileInput.value = profileDescription.textContent;
}

// Добавление новой карточки

function addNewCard(newCard) {
  cardsContainer.prepend(newCard);
}

function handleFormNewCardSubmit(evt) {
  evt.preventDefault();

  const name = nameCardInput.value;
  const link = linkCardInput.value;

  addNewCard(
    createCard({
      card: { name, link },
      deleteCard,
      likeCard,
      openModalFullImage,
    })
  );

  formAddNewCard.reset();
  closeModal(popupTypeNewCard);
}

formAddNewCard.addEventListener("submit", handleFormNewCardSubmit);
