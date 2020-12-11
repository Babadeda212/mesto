// открыте popup
import { FormValidator} from "../scripts/FormValidator.js";
import {validationConfig} from "./contants.js";
function openPopup(popup,evt){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown',closeByEsc);
    popup.addEventListener('click',closeByOverlayClick);
}

function closePopup(popup){  
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown',closeByEsc);
    popup.removeEventListener('click',closeByOverlayClick);
    
}
function closeByEsc(evt){   
    if(evt.key==='Escape'){
     const popup = document.querySelector('.popup_opened');
         closePopup(popup);
     }
}
function closeByOverlayClick(evt){
 if(evt.target.classList.contains('popup')){
     const popup = evt.target;
     closePopup(popup);
 }
}

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

export {openImage,openPopup,closePopup,closeButtonImage,popupImage};