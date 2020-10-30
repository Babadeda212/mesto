let buttonEditProfile =document.querySelector('.profile__info-edit-button');
let formEdit = document.querySelector('.edit-form');
let closeButtonFormEdit = document.querySelector('.edit-form__close');
let nameFormEdit = document.querySelector('.edit-form__fieldName');
let subNameFormEdit = document.querySelector('.edit-form__fieldSubtitle');
let saveButton = document.querySelector('.edit-form__submitButton');
let profileName = document.querySelector('.profile__info-title');
let profileSubtitle = document.querySelector('.profile__info-subtitle');
let form=document.querySelector('.edit-form__form');


function openFormEdit() {
    formEdit.classList.remove('edit-form__hidden');
    formEdit.classList.add('edit-form__open');
}
function closeForm(){
    formEdit.classList.add('edit-form__hidden');
    formEdit.classList.remove('edit-form__open');
    nameFormEdit.value=profileName.textContent;
    subNameFormEdit.value=profileSubtitle.textContent;
}
function addTextProfile(evt){
    evt.preventDefault();
    let name = nameFormEdit.value;
    let subName= subNameFormEdit.value;
    profileName.textContent=name;
    profileSubtitle.textContent=subName;
    closeForm();
}

form.addEventListener('submit',addTextProfile);
buttonEditProfile.addEventListener('click',openFormEdit);
closeButtonFormEdit.addEventListener('click',closeForm);