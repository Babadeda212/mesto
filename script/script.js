let buttonEditProfile =document.querySelector('.profile__info-edit-button');

let profileName = document.querySelector('.profile__info-title');
let profileSubtitle = document.querySelector('.profile__info-subtitle');

let formProfil=document.querySelector('.popup__form');
let popup=document.querySelector('.popup');
let popupClose=document.querySelector('.popup__button-close');
let nameInput=document.querySelector('.popup__input_name_name');
let subNameInput=document.querySelector('.popup__input_name_description');
let saveButton = document.querySelector('#profileSave');



const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 
// Загрузка картинок
const elementTamplet = document.querySelector('#template__element').content; 
const elements = document.querySelector('.elements');
let titleNameImage;
let srcImage;

function lodeCard(){
    for(let i=0;i<initialCards.length;i=i+1){
        const oneCard = elementTamplet.cloneNode(true);
        oneCard.querySelector('.element__image').src = initialCards[i].link;
        oneCard.querySelector('.element__title').textContent = initialCards[i].name;
        oneCard.querySelector('.element__like').addEventListener('click',function(evt){
            evt.target.classList.toggle('element__like_active');
        })
        oneCard.querySelector('.element__delite').addEventListener('click',function(evt){
            const oneElem = evt.target.closest('.element');
            oneElem.remove();
        })
        oneCard.querySelector('.element__image').addEventListener('click',function(evt){
            titleNameImage=evt.target.closest('.element').querySelector('.element__title').textContent;
            scrImage=evt.target.src;
            openImage();
        })
        elements.append(oneCard);
    }
}




//Редактирование профиля 
function openPopup(){
    popup.classList.remove('popup_hidden');
    popup.classList.add('popup_open');
    formProfil.classList.remove('form_hidden');
    formProfil.classList.add('form_open');
    nameInput.value=profileName.textContent;
    subNameInput.value=profileSubtitle.textContent;
}
function closePopup(){
    formProfil.classList.add('form_hidden');
    formProfil.classList.remove('form_open');   
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

formProfil.addEventListener('submit',addTextProfile);
buttonEditProfile.addEventListener('click',openPopup);
popupClose.addEventListener('click',closePopup);
lodeCard();
//Редактирования карниток 
const formImage = document.querySelector('.image__form');
const closeButtonFormImage = document.querySelector('#popupImageClose');
const addImageButton = document.querySelector('.profile__add-button');
const nameImage = document.querySelector('.image__input_name');
const linkImage = document.querySelector('.image__input_link');
const saveAddImage = document.querySelector('#imageSave');


function openAddImage(){
    popup.classList.remove('popup_hidden');
    popup.classList.add('popup_open');
    formImage.classList.remove('form_hidden');
    formImage.classList.add('form_open');
}
function closeAddImage(){
    popup.classList.add('popup_hidden');
    popup.classList.remove('popup_open');
    formImage.classList.add('form_hidden');
    formImage.classList.remove('form_open');
}
function addImage(){
    const card = elementTamplet.cloneNode(true);
    card.querySelector('.element__image').src = linkImage.value;
    card.querySelector('.element__title').textContent = nameImage.value;
    card.querySelector('.element__like').addEventListener('click',function(evt){
        evt.target.classList.toggle('element__like_active');
    })
    card.querySelector('.element__delite').addEventListener('click',function(evt){
        const oneElem = evt.target.closest('.element');
        oneElem.remove();
    })
    card.querySelector('.element__image').addEventListener('click',function(evt){
        titleNameImage=evt.target.closest('.element').querySelector('.element__title').textContent;
        scrImage=evt.target.src;    
        openImage();
    })
    initialCards.push({name:nameImage.value,link:linkImage.value});
    closeAddImage();
    nameImage.value='';
    linkImage.value='';
    elements.append(card);
}
saveAddImage.addEventListener('click',addImage);
addImageButton.addEventListener('click',openAddImage);
closeButtonFormImage.addEventListener('click',closeAddImage);

// Открытие каринток 
const elemImage = document.querySelector('.image');
const closeButtonImage = document.querySelector('#closeImage');
const imageName = document.querySelector('.image__name');
const imagelink = document.querySelector('.image__img');

function openImage(){
    elemImage.classList.add('image_open');
    elemImage.classList.remove('image_hidden');
    popup.classList.remove('popup_hidden');
    popup.classList.add('popup_open');
    imageName.textContent=titleNameImage;
    imagelink.src=scrImage;
    console.log(imageName,imagelink);
}

function closeImage(){
    elemImage.classList.remove('image_open');
    elemImage.classList.add('image_hidden');
    popup.classList.remove('popup_open');
    popup.classList.add('popup_hidden');
}


closeButtonImage.addEventListener('click',closeImage);
