let buttonEditProfile =document.querySelector('.profile__info-edit-button');

let profileName = document.querySelector('.profile__info-title');
let profileSubtitle = document.querySelector('.profile__info-subtitle');

let popup=document.querySelector('.popup');
let popupClose=document.querySelector('.popup__button-close');
let nameInput=document.querySelector('.popup__form_name');
let subNameInput=document.querySelector('.popup__form_subname');
let saveButton = document.querySelector('.popup__form-save');


function openPopup(){
    popup.classList.remove('popup__hidden');
    popup.classList.add('popup__open');
    profileName.textContent=nameInput.value;
    profileSubtitle.textContent=subNameInput.value;
}
function closePopup(){
    popup.classList.add('popup__hidden');
    popup.classList.remove('popup__open');
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