//Пункт №6
// По клике на кнопку должны подгружаться(показываться) дополнительные стили (блоки)ю Сама кнопка при этом изчезает
//
const showMoreStyles = (trigger, styles)=> {
   const cards = document.querySelectorAll(styles),
         btn = document.querySelector(trigger);
         console.log(btn);
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
      // скрываем кнопку
      btn.style.display = 'none';
      // или удаляем кнопку вообще со страници
      // btn.remove();
   });
};

export default showMoreStyles;