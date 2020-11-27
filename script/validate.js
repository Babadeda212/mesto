// Не обращайте внимание что код выглядит подругому, я его переписывал с нуля =)







// Запуск валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible' 
}); 

// Функция запуска валидации 
function enableValidation({formSelector, inputSelector, submitButtonSelector,inactiveButtonClass,inputErrorClass}){
  const formElements = Array.from(document.querySelectorAll(formSelector));
  formElements.forEach(form => {
      form.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });
  const buttonElement = form.querySelector(submitButtonSelector);   
      setEventListeners(form, inputSelector, buttonElement,inactiveButtonClass,inputErrorClass);
     toggleButtonState(buttonElement, form.checkValidity(),inactiveButtonClass);
  });
}

// Функция вешанья слушателей на инпуты 
function setEventListeners(formElement, inputSelector, buttonElement,inactiveButtonClass,inputErrorClass) {
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  inputs.forEach(input => {
     input.addEventListener('input', (evt) => {

         checkInputValidity(formElement, evt.target,inputErrorClass);
         const isAllValid = formElement.checkValidity();
         toggleButtonState(buttonElement, isAllValid,inactiveButtonClass);
     });

  });
  }
// Блокировака кнопки
  function toggleButtonState(buttonElem, isActive,inactiveButtonClass) {
      if (!isActive) {
          buttonElem.disabled = true;
          buttonElem.classList.add(inactiveButtonClass); // Почему то, если просто добавить popup__save_disabled кнопка не поменятся, свойства не присвояться и кнопка останется прежней 
          buttonElem.classList.remove('popup__save');    // В браузере, в панели, свойства перечекнуты и не активны  
      } else {
        buttonElem.disabled = false;
        buttonElem.classList.remove(inactiveButtonClass);
        buttonElem.classList.add('popup__save');
      }
  }
// Валидация формы и инпутов
  function checkInputValidity(formElement, input,inputErrorClass) {
      if (input.checkValidity()) {
          hideError(formElement, input,inputErrorClass);
      } else {
          showError(formElement, input,inputErrorClass);
      }
  }
//Скрыть/Окрыть сообщение об ошибки
  function showError(formElement, input,inputErrorClass) {
      const errorElement = formElement.querySelector(`#${input.id}-error`);
      errorElement.textContent = input.validationMessage;
      input.classList.add(inputErrorClass);
  } 
  function hideError(formElement, input,inputErrorClass) {
      const errorElement = formElement.querySelector(`#${input.id}-error`);
      errorElement.textContent = '';
      input.classList.remove(inputErrorClass);
  }



