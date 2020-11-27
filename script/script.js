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


function closeByEsc(evt){
    const popup = document.querySelector('.popup_opened');
   
       if(evt.key==='Escape'){
            closePopup(popup);
        }
}
function closeByOverlayClick(evt){
    const popup = document.querySelector('.popup_opened');
    if(evt.target.classList.contains('popup')){
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
    const buttonSave = popup.querySelector('#popupSave');
    document.removeEventListener('keydown',closeByEsc);
    popup.removeEventListener('click',closeByOverlayClick);
    disableButton(buttonSave,popup);
}
function disableButton(popupButton,popup){ 
    
    if(popup!==popupImage){
        if(popupButton.classList.length === 1){
            popupButton.classList.add('popup__save_disabled');
            popupButton.classList.remove('popup__save');
            popupButton.disabled = true;
        }
    }
    
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
const popupProfile = document.querySelector('.popup__profile');
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
    //const button =  popupProfile.querySelector('.popup__save');
    const name = nameInput.value;
    const subName = subNameInput.value;
    profileName.textContent=name;
    profileSubtitle.textContent=subName;
    closePopup(popupProfile);
}
loadCards();
formProfil.addEventListener('submit',addTextProfile);
buttonEditProfile.addEventListener('click',openPopupProfile);
popupClose.addEventListener('click',() => closePopup(popupProfile));



//Редактирования карниток 
const popupPlace = document.querySelector('.popup__add-card')

const formImage = popupPlace.querySelector('.popup__form_type_image');
const closeButtonFormImage = popupPlace.querySelector('.popup__close-type-image');
const nameImage = popupPlace.querySelector('.popup__input_type_place');
const linkImage = popupPlace.querySelector('.popup__input_type_link');
const saveAddImage = popupPlace.querySelector('.popup__save');

function addImage(evt){
    evt.preventDefault();
    const card = createCard(nameImage.value,linkImage.value);
    elements.prepend(card);
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
const popupImage = document.querySelector('.popup__fullimage');
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

closeButtonImage.addEventListener('click',() => closePopup(popupImage));

//Закрытие на оверлей

