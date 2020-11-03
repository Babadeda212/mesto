let buttonEditProfile =document.querySelector('.profile__info-edit-button');

let profileName = document.querySelector('.profile__info-title');
let profileSubtitle = document.querySelector('.profile__info-subtitle');

let popup=document.querySelector('.popup');
let popupClose=document.querySelector('.popup__button-close');
let nameInput=document.querySelector('.popup__input_name_name');
let subNameInput=document.querySelector('.popup__input_name_description');
let saveButton = document.querySelector('.popup__form-save');


function openPopup(){
    popup.classList.remove('popup_hidden');
    popup.classList.add('popup_open');
    nameInput.textContent=profileName.value;
    subNameInput.textContent=profileSubtitle.value;
}
function closePopup(){
    popup.classList.add('popup_hidden');
    popup.classList.remove('popup_open');
}
function addTextProfile(evt){
    evt.preventDefault();
    let name = nameInput.value;
    let subName= subNameInput.value;
    profileName.textContent=name;
    profileSubtitle.textContent=subName;
    closePopup();
}
popup.addEventListener('submit',addTextProfile);
buttonEditProfile.addEventListener('click',openPopup);
popupClose.addEventListener('click',closePopup);