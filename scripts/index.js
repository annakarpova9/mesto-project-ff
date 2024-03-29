// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки

const createCard = (card, handleDelete) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const img = cardElement.querySelector(".card__image");
  img.src = card.link;
  img.alt = card.name;

  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => handleDelete(cardElement));

  return cardElement;
};

// @todo: Функция удаления карточки

const deleteCard = (card) => {
  card.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard);
  cardsContainer.append(card);
});
