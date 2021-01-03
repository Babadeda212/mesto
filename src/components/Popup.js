

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closePopupButton = this._popup.querySelector(".button_action_close");
    this._popupOverlay = this._popup.querySelector(".popup__overlay");

    this._handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    }

    this._handleOverlayClose = (evt) => {
      if (evt.target.classList.contains("popup__overlay")) {
        this.close();
      }
    }

    this._handleButtonClose = (evt) => {
      if (evt.target.classList.contains("button_action_close")) {
        this.close();
      }
    }
  }

  open() {
    this._popup.classList.add("modal_is-opened");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("modal_is-opened");
    this.removeEventListeners();
  }

  setEventListeners() {
    this._closePopupButton.addEventListener("click", this._handleButtonClose);
    this._popupOverlay.addEventListener("click", this._handleOverlayClose);
    document.addEventListener("keydown", this._handleEscClose);
  }

  removeEventListeners() {
    this._closePopupButton.removeEventListener("click", this._handleButtonClose);
    this._popupOverlay.removeEventListener("click", this._handleOverlayClose);
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
