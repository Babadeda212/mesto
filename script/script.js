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
// создание карточек 
function createCard(name,link){
    const oneCard = elementTemplet.cloneNode(true);
        const elementImage = oneCard.querySelector('.element__image');
        elementImage.src = link;
        elementImage.alt = name;
        oneCard.querySelector('.element__title').textContent = name;
        oneCard.querySelector('.element__like').addEventListener('click',function(evt){
            evt.target.classList.toggle('element__like_active');
        })
        oneCard.querySelector('.element__delite').addEventListener('click',function(evt){
            const oneElem = evt.target.closest('.element');
            oneElem.remove();
        })
        elementImage.addEventListener('click',function(){
            openImage(name, link);
        })
        return oneCard;
}
// открыте popup
function openPopup(popup){
    popup.classList.remove('popup_hidden');
    popup.classList.add('popup_open');
    console.log("Открылось");
}
function closePopup(popup){   
    popup.classList.add('popup_hidden');
    popup.classList.remove('popup_open');
    console.log("Закрылось");
}



// Загрузка картинок
const elementTemplet = document.querySelector('#template__element').content; 
const elements = document.querySelector('.elements');

function loadCards(){
    for(let i=0;i<initialCards.length;i=i+1){
      const card=createCard(initialCards[i].name,initialCards[i].link);
        elements.prepend(card);
    }
}

//Редактирование профиля
const buttonEditProfile =document.querySelector('.profile__info-edit-button');
const profileName = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');
const addImageButton = document.querySelector('.profile__add-button');
const popupProfile=document.querySelector('.popup_profile');
const formProfil=popupProfile.querySelector('.form');
const popupClose=popupProfile.querySelector('.popup__button-close');
const nameInput=popupProfile.querySelector('.popup__input_name_name');
const subNameInput=popupProfile.querySelector('.popup__input_name_description');

function openPopupProfile(){
    openPopup(popupProfile);
    nameInput.value=profileName.textContent;
    subNameInput.value=profileSubtitle.textContent;
}
function addTextProfile(evt){
    evt.preventDefault();
    const name = nameInput.value;
    const subName= subNameInput.value;
    profileName.textContent=name;
    profileSubtitle.textContent=subName;
    closePopup(popupProfile);
}
loadCards();
formProfil.addEventListener('submit',addTextProfile);
buttonEditProfile.addEventListener('click',openPopupProfile);
popupClose.addEventListener('click',() => closePopup(popupProfile));



//Редактирования карниток 
const popupPlace = document.querySelector('.popup_place')

const formImage = popupPlace.querySelector('.form');
const closeButtonFormImage = popupPlace.querySelector('.popup__button-close');
const nameImage = popupPlace.querySelector('#image__input_name');
const linkImage = popupPlace.querySelector('#image__input_link');
const saveAddImage = popupPlace.querySelector('.popup__form-save');

function addImage(evt){
    evt.preventDefault();
    const card = createCard(nameImage.value,linkImage.value);
    elements.prepend(card);
    closePopup(popupPlace)
    nameImage.value='';
    linkImage.value='';
    
}
formImage.addEventListener('submit',addImage);
addImageButton.addEventListener('click',() => openPopup(popupPlace));
closeButtonFormImage.addEventListener('click',() => closePopup(popupPlace));

// Открытие каринток 
const popupImage = document.querySelector('.popup_image');
const elemImage = popupImage.querySelector('.image');
const closeButtonImage = popupImage.querySelector('.image__close');
const imageName = popupImage.querySelector('.image__name');
const imagelink = popupImage.querySelector('.image__img');

function openImage(name,link){
    imageName.textContent = name;
    imagelink.src = link;
    openPopup(popupImage)
}

closeButtonImage.addEventListener('click',() => closePopup(popupImage));




// Все функции 
