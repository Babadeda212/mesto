
import {openImage} from '../utils/utils.js'
export class createCardClass{
    constructor(title,link,templateElement){
        this._title=title;
        this._link=link;
        this._templateElement=templateElement;
        
    }
    _getTemplate(){
        const createElement = document.querySelector(this._templateElement).content.cloneNode(true);
        return createElement;
    }
    generateCard(){
        this._element=this._getTemplate();
        this._elementImage =this._element.querySelector('.element__image'); 
        this._elementImage.src=this._link;
         this._elementImage.alt=this._title;
        this._element.querySelector('.element__title').textContent=this._title;
       this._setEventListeners();
        return this._element;
    }
    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click',function(evt){
            evt.target.classList.toggle('element__like_active');
        })
        this._element.querySelector('.element__delite').addEventListener('click',function(evt){
            const oneElem = evt.target.closest('.element');
            oneElem.remove();
        })
        this._elementImage.addEventListener('click',function(evt){
            openImage(evt.target.alt,evt.target.src);
        })
    }
}
