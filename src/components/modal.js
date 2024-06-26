// Функция открытия модального окна

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

//Функция закрытия окна: при нажатии на Esc, на крестик и на оверлей

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export function closePopupOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

export function closePopupCross(evt) {
  if (evt.target.classList.contains("popup__close")) {
    closeModal(evt.target.closest(".popup"));
  }
}
