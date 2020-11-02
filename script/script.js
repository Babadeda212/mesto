let buttonEditProfile =document.querySelector('.profile__info-edit-button');

let profileName = document.querySelector('.profile__info-title');
let profileSubtitle = document.querySelector('.profile__info-subtitle');

let popup=document.querySelector('.popup');
let popupClose=document.querySelector('.popup__button-close');
let nameInput=document.querySelector('.popup__form-name');
let subNameInput=document.querySelector('.popup__form-subname');
let saveButton = document.querySelector('.popup__form-save');



function openFormEdit() {
    popup.classList.remove('popup-hidden');
    popup.classList.add('popup-open');
}
function closeForm(){
    popup.classList.add('popup-hidden');
    popup.classList.remove('popup-open');
}
function addTextProfile(evt){
    evt.preventDefault();
    let name = nameInput.value;
    let subName= subNameInput.value;
    profileName.textContent=name;
    profileSubtitle.textContent=subName;
    closeForm();
}
function openPopup(){
    popup.classList.remove('popup-hidden');
    popup.classList.add('popup-open');
}
function closePopup(){
    popup.classList.add('popup-hidden');
    popup.classList.remove('popup-open');
}
popup.addEventListener('submit',addTextProfile);
buttonEditProfile.addEventListener('click',openPopup);
popupClose.addEventListener('click',closePopup);