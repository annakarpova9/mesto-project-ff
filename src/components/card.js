import { apiRequest, catchError } from "../components/api.js";

const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки

export function createCard(cardConfig, ownerId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const img = cardElement.querySelector(".card__image");
  img.src = cardConfig.card.link;
  img.alt = cardConfig.card.name;

  img.addEventListener("click", () => {
    cardConfig.openModalFullImage(img, title);
  });

  const title = cardElement.querySelector(".card__title");
  title.textContent = cardConfig.card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (cardConfig.card.owner._id !== ownerId) {
    deleteButton.remove();
  } else {
    cardConfig.clickButtonDeleteCard(
      deleteButton,
      cardConfig.card,
      cardElement
    );
  }

  const likeBtn = cardElement.querySelector(".card__like-button");
  const likeAmount = cardElement.querySelector(".card__like-amount");

  likeAmount.textContent =
    cardConfig.card.likes.length === 0 ? "0" : cardConfig.card.likes.length;

  if (
    cardConfig.card.likes.some((like) => {
      return like._id === ownerId;
    })
  ) {
    likeBtn.classList.add("card__like-button_is-active");
  }

  likeBtn.addEventListener("click", () =>
    cardConfig.likeCard(cardConfig.card, likeBtn, likeAmount)
  );

  return cardElement;
}

// Функция лайка

export function likeCard(card, likeBtn, likeAmount) {
  if (likeBtn.classList.contains("card__like-button_is-active")) {
    apiRequest({
      url: `cards/likes/${card._id}`,
      method: "DELETE",
    })
      .then((res) => {
        likeBtn.classList.remove("card__like-button_is-active");
        likeAmount.textContent =
          res.likes.length === 0 ? "0" : res.likes.length;
      })
      .catch(catchError);
  } else {
    apiRequest({
      url: `cards/likes/${card._id}`,
      method: "PUT",
    })
      .then((res) => {
        likeBtn.classList.add("card__like-button_is-active");
        likeAmount.textContent =
          res.likes.length === 0 ? "0" : res.likes.length;
      })
      .catch(catchError);
  }
}
