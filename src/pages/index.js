import { PopupWithForm } from "../components/popup-with-form.js";
import { PopupWithImage } from "../components/popup-with-image.js";
import { PopupWithMessage } from "../components/popup-with-message.js";
import { Card } from "../components/Card.js";
import { UserInfo } from "../components/user-info.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { selectors } from "../utils/constants.js";
import { Api } from "../components/Api.js";

import "./index.css";

// Все переменные

const {
  formSelectors,
  popupsSelectors: {
    editPopupSelector,
    addPopupSelector,
    imagePopupSelector,
    messagePopupSelector,
    confirmPopupSelector,
    changeAvatarPopupSelector,
  },
  pageButtons: {
    editProfileButtonSelector,
    addElementButtonSelector,
    editAvatarButtonSelector,
  },
  elementSelectors: { templateSelector },
  elements: { elementsSelector },
  userInfoSelectors: { nameSelector, aboutSelector, avatarImageSelector },
} = selectors;



function enableValidation(selectorsData, formElement) {
  const result = new FormValidator(selectorsData, formElement);
  result.enableValidation();
  return result;
}

// Попап с ошибкой

const messagePopup = new PopupWithMessage(messagePopupSelector);

const errorHandler = (promise, successCallback, failureCallback) => {
  return promise
    .then((data) => successCallback(data))
    .catch((error) => {
      if (error instanceof TypeError) {
        messagePopup.open(
          "Потеряно соединение с сервером, повторите попытку позднее"
        );
      } else if (typeof error === "string") {
        messagePopup.open(error);
      } else {
        messagePopup.open("Непредвиденная ошибка, повторите попытку позднее");
      }
      if (failureCallback) {
        failureCallback();
      }
    });
};


// Апи

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19/",
  headers: {
    authorization: "596d7363-2740-4a9e-a1e0-755165feb3a1",
    "Content-Type": "application/json; charset=utf-8",
  },
  errorHandler: errorHandler,
});

// инфа о пользователе

const userInfo = new UserInfo(nameSelector, aboutSelector, avatarImageSelector);

errorHandler(api.getProfileData(), (data) => {
  userInfo.setUserInfo(data);
});



// попоап редактирования

const editPopup = new PopupWithForm(
  editPopupSelector,
  (evt) => {
    evt.preventDefault();
    editPopup.renderLoading(true);
    const { nameInput: name, jobInput: about } = editPopup.getInputValues();
    errorHandler(api.editProfile({ name, about }), ({ name, about }) => {
      userInfo.setName(name).setAbout(about);
      editPopup.close();
    }).finally(() => {
      editPopup.renderLoading(false);
    });
  },
  "Сохранить"
);

const editFormValidator = enableValidation(
  formSelectors,
  editPopup.formElement
);

const editButton = document.querySelector(editProfileButtonSelector);
editButton.addEventListener("click", () => {
  const { name: nameInput, job: jobInput } = userInfo.getUserInfo();
  editPopup.setInputValues({ nameInput, jobInput });
  editFormValidator.clearErrors();
  editPopup.open();
});

// Попап смена аватарки

const changeAvatarPopup = new PopupWithForm(
  changeAvatarPopupSelector,
  (evt) => {
    evt.preventDefault();
    const { avatarInput: avatar } = changeAvatarPopup.getInputValues();
    changeAvatarPopup.renderLoading(true);
    errorHandler(api.changeAvatar(avatar), ({ avatar }) => {
      userInfo.setAvatarImage(avatar);
      changeAvatarPopup.close();
    }).finally(() => {
      changeAvatarPopup.renderLoading(false);
    });
  },
  "Сохранить"
);

const changeAvatarFormValidator = enableValidation(
  formSelectors,
  changeAvatarPopup.formElement
);

const editAvatarButton = document.querySelector(editAvatarButtonSelector);

editAvatarButton.addEventListener("click", () => {
  changeAvatarFormValidator.clearErrors();
  changeAvatarPopup.open();
});

// попап добавления картинок

const addPopup = new PopupWithForm(
  addPopupSelector,
  (evt) => {
    evt.preventDefault();
    addPopup.renderLoading(true);
    const { titleInput: name, linkInput: link } = addPopup.getInputValues();
    errorHandler(api.addCard({ name, link }), (data) => {
      elementsSection.prependItem(
        createCard(data).changeDeleteButtonState(true).getElement()
      );
      addPopup.close();
    }).finally(() => {
      addPopup.renderLoading(false);
    });
  },
  "Добавить"
);

const addFormValidator = enableValidation(formSelectors, addPopup.formElement);

const addButton = document.querySelector(addElementButtonSelector);
addButton.addEventListener("click", () => {
  addFormValidator.clearErrors();
  addPopup.open();
});


// Попап картинок

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

// Подтверждение удаление картинок попап

const confirmPopup = new PopupWithForm(
  confirmPopupSelector,
  (evt) => {
    evt.preventDefault();
    confirmPopup.renderLoading(true);
    errorHandler(api.deleteCard(confirmPopup._cardElement._id), () => {
      confirmPopup._cardElement._element.remove();
      confirmPopup.close();
    }).finally(() => {
      confirmPopup.renderLoading(false);
    });
  },
  "Да"
);

// Загрузка карточек

const createCard = (data) => {
  return new Card(templateSelector, data, {
    likeHandler: function () {
      if (this._isLiked) {
        errorHandler(api.removeLike(this._id), (data) => {
          this.changeLikeButtonState(
            data,
            data.likes.some((user) => user._id == userInfo._id)
          );
        });
      } else {
        errorHandler(api.setLike(this._id), (data) => {
          this.changeLikeButtonState(
            data,
            data.likes.some((user) => user._id == userInfo._id)
          );
        });
      }
    },
    deleteHandler: function () {
      confirmPopup._cardElement = this;
      confirmPopup.open();
    },
    clickHandler: (title, link) => imagePopup.open({ title, link }),
  }).configureCard();
};

const elementsSection = new Section(
  {
    renderer: (cardData) => {
      elementsSection.prependItem(createCard(cardData).getElement());
    },
  },
  elementsSelector
);
elementsSection.renderItems();

errorHandler(api.getInitialCards(), (data) =>
  data.forEach((cardData) => {
    const card = createCard(cardData);
    card.changeLikeButtonState(
      cardData,
      cardData.likes.some((responseUser) => userInfo._id === responseUser._id)
    );
    card.changeDeleteButtonState(cardData.owner._id == userInfo._id);
    elementsSection.addItem(card.getElement());
  })
);
