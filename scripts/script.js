//Ипорты 
import {createCardClass} from './Card.js'
import{initialCards} from '../utils/initial-сards.js'
import { FormValidator} from "./FormValidator.js";
import {validationConfig} from "../utils/contants.js";
import {openImage,openPopup,closePopup} from '../utils/utils.js';




//Редактирование профиля
const buttonEditProfile =document.querySelector('.profile__info-edit-button');
const profileName = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');
const addImageButton = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_profile');
const formProfil = popupProfile.querySelector('.popup__form_type_profile');
const popupClose = popupProfile.querySelector('.popup__close-type-profile');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const subNameInput = popupProfile.querySelector('.popup__input_type_job');

function openPopupProfile(){
    const editPopupValidation = new FormValidator(validationConfig , popupProfile);
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
popupClose.addEventListener('click',() => closePopup(popupProfile));

const elem = document.querySelector('.elements');

// создание Карт 
function app(elem,card){
    elem.append(card);
}
function prep(elem,card){
    elem.prepend(card);
}
function createCard(itemName,itemLink,func){
    const card = new createCardClass(itemName,itemLink,'#template__element');
    const cardElement = card.generateCard();
    func(elem,cardElement);
}
// Выгрузка картинок
initialCards.forEach((item) => {
    createCard(item.name,item.link,app);
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
    createCard(nameImage.value,linkImage.value,prep);
    addPopupValidation.enableValidation();
    closePopup(popupPlace)
    
    
}
formImage.addEventListener('submit',addImage);
addImageButton.addEventListener('click',() => {
    const editPopupValidation = new FormValidator(validationConfig , popupPlace);
    editPopupValidation.disableButton();
    editPopupValidation.disableError();
    openPopup(popupPlace);
    nameImage.value='';
    linkImage.value='';

});
closeButtonFormImage.addEventListener('click',() => closePopup(popupPlace));

//Валидация

const editPopupValidation = new FormValidator(validationConfig , popupPlace),
    addPopupValidation = new FormValidator(validationConfig , popupProfile);
    editPopupValidation.enableValidation();
    addPopupValidation.enableValidation();