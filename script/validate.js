  const showInputError = (formElement, inputElement,errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
     inputElement.classList.add('popup__input_type_error');
     errorElement.textContent = errorMessage;
  };


const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
  };

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {

      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {

      hideInputError(formElement, inputElement);
    }
  };   
const hasInvalidInput = (inputList) => {

  return inputList.some((inputElement) => {


    return !inputElement.validity.valid;
  })
}; 
const toggleButtonState = (inputList, buttonElement) => {

  if (hasInvalidInput(inputList)) {

    buttonElement.classList.add('popup__save_disabled');
    buttonElement.classList.remove('popup__save');
    buttonElement.disabled = true;
  } else {

    buttonElement.classList.remove('popup__save_disabled');
    buttonElement.classList.add('popup__save');
    buttonElement.disabled = false;
  }
}; 

const enableValidation = () => {

    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
  };
 
  
 

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }; 
  enableValidation();



 


