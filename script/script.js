function closeByEsc(evt){   
       if(evt.key==='Escape'){
        const popup = document.querySelector('.popup_opened');
            closePopup(popup);
        }
}
function closeByOverlayClick(evt){
    if(evt.target.classList.contains('popup')){
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}
// открыте popup
function openPopup(popup,evt){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown',closeByEsc);
    popup.addEventListener('click',closeByOverlayClick);
}

function closePopup(popup){  
    popup.classList.remove('popup_opened');
    const buttonSave = popup.querySelector('.popup__save');
    document.removeEventListener('keydown',closeByEsc);
    popup.removeEventListener('click',closeByOverlayClick);
    
}

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
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    subNameInput.value = profileSubtitle.textContent;
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

// создание кариток 
import {initialCards,createCardClass} from './card.js'
initialCards.forEach((item) => {
    const card = new createCardClass(item.name,item.link,'#template__element');
    const cardElement = card.generateCard();
    document.querySelector('.elements').append(cardElement);
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
    const card =  new createCardClass(nameImage.value,linkImage.value,'#template__element');
    document.querySelector('.elements').prepend(card.generateCard());
    closePopup(popupPlace)
    
    
}
formImage.addEventListener('submit',addImage);
addImageButton.addEventListener('click',() => {
    openPopup(popupPlace);
    nameImage.value='';
    linkImage.value='';
});
closeButtonFormImage.addEventListener('click',() => closePopup(popupPlace));

// Открытие каринток 
const popupImage = document.querySelector('.popup_fullimage');
const elemImage = popupImage.querySelector('.image');
const closeButtonImage = popupImage.querySelector('.popup__close-type-fullimage');
const imageName = popupImage.querySelector('.popup__image-title');
const imagelink = popupImage.querySelector('.image-popup');

function openImage(name,link){
    imageName.textContent = name;
    imagelink.alt = name;
    imagelink.src = link;
    openPopup(popupImage)
}
export {openImage};
closeButtonImage.addEventListener('click',() => closePopup(popupImage));

//Валидация
import { FormValidator, enableValidation } from "./FormValidator.js";
const editPopupValidation = new FormValidator(enableValidation, popupPlace),
    addPopupValidation = new FormValidator(enableValidation, popupProfile);
    editPopupValidation.enableValidation();
    addPopupValidation.enableValidation();