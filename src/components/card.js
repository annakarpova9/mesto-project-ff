import { cardTemplate } from "../scripts/index.js";

// Функция создания карточки

export function createCard(cardConfig) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const img = cardElement.querySelector(".card__image");
  img.src = cardConfig.card.link;
  img.alt = cardConfig.card.name;

  const title = cardElement.querySelector(".card__title");
  title.textContent = cardConfig.card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () =>
    cardConfig.deleteCard(cardElement)
  );

  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", () => cardConfig.likeCard(likeBtn));

  img.addEventListener("click", () =>
    cardConfig.openModalFullImage(img, title)
  );

  return cardElement;
}

// Функция удаления карточки и лайк

export function deleteCard(card) {
  card.remove();
}

export function likeCard(like) {
  like.classList.toggle("card__like-button_is-active");
}
