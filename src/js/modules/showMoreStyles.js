//Пункт №6
// По клике на кнопку должны подгружаться(показываться) дополнительные стили (блоки)ю Сама кнопка при этом изчезает
import {getResource} from '../services/requests';

const showMoreStyles = (trigger, wrapper)=> {
   const btn = document.querySelector(trigger);
         // console.log(btn);
// 1-q вариант
/*
   // Анимация 
   cards.forEach(card => {
      card.classList.add('animated', 'fadeInUp');
   });
 
   // убираем и добавляем другие классы
   btn.addEventListener('click', () => {
      
      cards.forEach(card => {
         card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
         card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
      });
      // удаляем кнопку вообще со страници
      btn.remove();
   });  */

   // проверим работает ли код
   btn.addEventListener('click', function() {
      // getResource('http://localhost:3000/styles')
         // .then(res => createCards(res))
      // без использования json serverce
         getResource('assets/db.json')
         .then(res => createCards(res.styles))
         .catch(error => console.log(error));

         this.remove();
   });
   // функция создаёт блоки(карточки) и помещает их на страницу 10:10
   function createCards(response) {
      response.forEach(({src, title, link}) => {
         let card = document.createElement('div');
         card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
         // наполнение карточки
         card.innerHTML = `
            <div class="styles-block">
               <img src=${src} alt="style">
               <h4>${title}</h4>
               <a href=${link}>Подробнее</a>
            </div>
         `;
         // вывод карточки на страницу
         document.querySelector(wrapper).appendChild(card);
      });
   }
};

// второй вариант через запрос на сервер
export default showMoreStyles;