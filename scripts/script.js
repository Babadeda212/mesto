//Ипорты 
import {createCardClass} from './Card.js'
import{initialCards} from '../utils/initial-сards.js'
import { FormValidator} from "./FormValidator.js";
import {validationConfig} from "../utils/contants.js";
import {openImage,openPopup,closePopup,closeButtonImage,popupImage} from '../utils/utils.js';

//Редактирование профиля
const buttonEditProfile =document.querySelector('.profile__info-edit-button');
const profileName = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');
const addImageButton = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_profile');
const formProfil = popupProfile.querySelector('.popup__form_type_profile');
const buttonCloseEditProfilePopup = popupProfile.querySelector('.popup__close-type-profile');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const subNameInput = popupProfile.querySelector('.popup__input_type_job');

function openPopupProfile(){
    
    editPopupValidation.disableButton();
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    subNameInput.value = profileSubtitle.textContent;
    editPopupValidation.disableError();
}

function addTextProfile(evt){
    evt.preventDefault();
    const name = nameInput.value;
    const subName = subNameInput.value;
    profileName.textContent=name;
    profileSubtitle.textContent=subName;
    closePopup(popupProfile);
}
formProfil.addEventListener('submit',addTextProfile);
buttonEditProfile.addEventListener('click',openPopupProfile);
buttonCloseEditProfilePopup.addEventListener('click',() => closePopup(popupProfile));

const elem = document.querySelector('.elements');

// создание Карт 

function createCard(itemName,itemLink){
    const card = new createCardClass(itemName,itemLink,'#template__element');
    const cardElement = card.generateCard();
    return cardElement;
}
// Выгрузка картинок
initialCards.forEach((item) => {
    elem.prepend(createCard(item.name,item.link));
  }); 
  

//Редактирования карниток 
const popupPlace = document.querySelector('.popup_add-card')

const formImage = popupPlace.querySelector('.popup__form_type_image');
const closeButtonFormImage = popupPlace.querySelector('.popup__close-type-image');
const nameImage = popupPlace.querySelector('.popup__input_type_place');
const linkImage = popupPlace.querySelector('.popup__input_type_link');
const saveAddImage = popupPlace.querySelector('.popup__save');

function addImage(evt){
    evt.preventDefault();
    elem.prepend(createCard(nameImage.value,linkImage.value));
    
    closePopup(popupPlace)
}
formImage.addEventListener('submit',addImage);
addImageButton.addEventListener('click',() => {
    addPopupValidation.disableButton();
    addPopupValidation.disableError();
    openPopup(popupPlace);
    nameImage.value='';
    linkImage.value='';

});
closeButtonFormImage.addEventListener('click',() => closePopup(popupPlace));

//закрытие картинок 
closeButtonImage.addEventListener('click',() => closePopup(popupImage));
//Валидация
const addPopupValidation = new FormValidator(validationConfig , popupPlace);
const editPopupValidation = new FormValidator(validationConfig , popupProfile);
    editPopupValidation.enableValidation();
    addPopupValidation.enableValidation();