import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;

    this._submitFormButton = this._popup.querySelector(".popup__button");

    this._handleSubmit = () => {
      this._handleFormSubmit(this._getInputValues());

      this.close();
    }
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener("submit", this._handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();

    this._popup.removeEventListener("submit", this._handleSubmit);
  }


  close() {
    super.close();

    this._popup.reset();
  }
}
