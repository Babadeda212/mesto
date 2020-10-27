let buttonEditProfile =document.querySelector('.profile__info-edit-button');
let formEdit = document.querySelector('.editForm');
let closeButtonFormEdit = document.querySelector('.editForm__close');
let nameFormEdit = document.querySelector('.editForm__fieldName');
let subNameFormEdit = document.querySelector('.editForm__fieldSubtitle');
let saveButton = document.querySelector('.editForm__submitButton');
let profileName = document.querySelector('.profile__info-title');
let profileSubtitle = document.querySelector('.profile__info-subtitle');
let form=document.querySelector('.editForm__form');


function openFormEdit() {
    formEdit.style.display='grid';
}
function closeForm(){
    formEdit.style.display='none';
    nameFormEdit.value=profileName.textContent;
    subNameFormEdit.value=profileSubtitle.textContent;
}
function addTextProfile(){
    let name = nameFormEdit.value;
    let subName= subNameFormEdit.value;
    profileName.textContent=name;
    profileSubtitle.textContent=subName;
}

saveButton.addEventListener('click',addTextProfile);
buttonEditProfile.addEventListener('click',openFormEdit);
closeButtonFormEdit.addEventListener('click',closeForm);