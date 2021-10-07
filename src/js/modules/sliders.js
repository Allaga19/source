const sliders = (slides, dir, prev, next) => {
   // текущий слайд, который показывается на странице
   let slideIndex = 1,
      paused = false;
   // элементы скоторыми будем работать
   const items = document.querySelectorAll(slides);
        

   // функция, которая отвечает за перемещение слайд-индекса (n) и слайдера
   function showSlides(n) {
      // если слайдеров больше чем(n)
      if (n > items.length) {
         // то показыватся первый слайд
         slideIndex = 1;
      }
       // если слайдеров меньше чем(n)
      if (n < 1) {
         // то показывается последний слайд
         slideIndex = items.length;
      }
      // когда показывается слайд, то остальные скрываются
      items.forEach(item => {
         // добавляем класс анимации
         item.classList.add("animated");
         // скрываем все слайды
         item.style.display = "none";
      });
      // показываем нужный слайд
      items[slideIndex - 1].style.display = 'block';
   }

   showSlides(slideIndex);  // 08:01
   // функция перелистования 8:50
   function plusSlides(n) {
      showSlides(slideIndex += n);
   }

   // показыват ошибку 10:12
   try {
      const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next);

      prevBtn.addEventListener('click', () => {
         plusSlides(-1);
         items[slideIndex - 1].classList.remove('slideInLeft');
         items[slideIndex - 1].classList.add('slideInRight');
      });

      nextBtn.addEventListener('click', () => {
         plusSlides(1);
         items[slideIndex - 1].classList.remove('slideInRight');
         items[slideIndex - 1].classList.add('slideInLeft');
      });

   } catch(e){}
   // активация анимации и интервала
   function activateAnimation() {
      // если слайдер вертикальный
      if (dir === 'vertical') {
         // автопереключение
         paused = setInterval(function() {
            // переключаем слайдер в перед
               plusSlides(1);
               // анимация
               items[slideIndex - 1].classList.add('slideInDown');
         }, 3000);
      } else {
         // слайдер горизонтальный
         paused = setInterval(function() {
               plusSlides(1);
               items[slideIndex - 1].classList.remove('slideInRight');
               items[slideIndex - 1].classList.add('slideInLeft');
         }, 3000);
      }
   }
   activateAnimation();

   // отключение автоиатического переключения слайдеров
   // при наведении мышки на слайдер
   // когда наводит мышку
   items[0].parentNode.addEventListener('mouseenter', () => {
      clearInterval(paused);
   });
   // когда убирает мышку
   items[0].parentNode.addEventListener('mouseleave', () => {
      activateAnimation();
   });
};

export default sliders;