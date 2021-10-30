const filter = () => {
   const menu = document.querySelector('.portfolio-menu'),
         items = menu.querySelectorAll('li'),
         btnAll = menu.querySelector('.all'),
         btnLovers = menu.querySelector('.lovers'),
         btnChef = menu.querySelector('.chef'),
         btnGirl = menu.querySelector('.girl'),
         btnGuy = menu.querySelector('.guy'),
         btnGrandmother = menu.querySelector('.grandmother'),
         btnGranddad = menu.querySelector('.granddad'),
         wrapper = document.querySelector('.portfolio-wrapper'),
         markAll = wrapper.querySelectorAll('.all'),
         markGirl = wrapper.querySelectorAll('.girl'),
         markLovers = wrapper.querySelectorAll('.lovers'),
         markChef = wrapper.querySelectorAll('.chef'),
         markGuy = wrapper.querySelectorAll('.guy'),
         no = document.querySelector('.portfolio-no');
   // функция отвечающая за фильтрацию элементов
   const typeFilter = (markType) => {
      // сначало скрываем все элементы
      markAll.forEach(mark => {
         // обращаемся к стилям каждого элемента и скрываем его
         mark.style.display = 'none';
         // когда элементы скрыты скрываем и анимацию
         mark.classList.remove('animated', 'fadeIn');
      });
      // скрываем блок,где написано, что таких рабо ещё нет
      no.style.display = "none";
      no.classList.remove('animated', 'fadeIn');
      // фильтруем блоки
      if (markType) {
         markType.forEach(mark => {
               mark.style.display = 'block';
               mark.classList.add('animated', 'fadeIn');
         });
      } else {
         no.style.display = 'block';
         no.classList.add('animated', 'fadeIn');
      }
   };
// кнопки по которым кликает пользователь
   btnAll.addEventListener('click', () => {
      typeFilter(markAll);
   });

   btnLovers.addEventListener('click', () => {
      typeFilter(markLovers);
   });

   btnChef.addEventListener('click', () => {
      typeFilter(markChef);
   });

   btnGuy.addEventListener('click', () => {
      typeFilter(markGuy);
   });

   btnGirl.addEventListener('click', () => {
      typeFilter(markGirl);
   });

   btnGrandmother.addEventListener('click', () => {
      typeFilter();
   });

   btnGranddad.addEventListener('click', () => {
      typeFilter();
   });
// active 
   menu.addEventListener('click', (e) => {
      let target = e.target;

      if (target && target.tagName == "LI") {
         // удираем клас активности со все элементов
         items.forEach(btn => btn.classList.remove('active'));
         // добавляем класс активности выбранному элементу
         target.classList.add('active');
      }
   });
};

export default filter;