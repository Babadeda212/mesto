import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImagePhoto = this._popup.querySelector(".image-container__photo");
    this._popupImageTitle = this._popup.querySelector(".image-container__title");
  }

  open(image, title) {
    this._popupImagePhoto.src = image;
    this._popupImagePhoto.alt = title;
    this._popupImageTitle.textContent = title;

    super.open();
  }
}
