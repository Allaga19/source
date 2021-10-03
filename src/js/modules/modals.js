const modals = () => {
    // общий алгоритм, в который принимается, различные аргументы
    // для этого создаём функцию bindModal 
    // она отвичает за привязку модального окна к определённому тригеру
    // поэтому как аргументы передаём определённые параметры:
    // triggerSelector, modalSelector, closeSelector, closeClickOverlay
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();
              
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                // открытие модального окна
                modal.style.display = "block";
                // чтобы страница под модальным окном непрокручивалась
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
                // document.body.classList.add('modal-open');   можно использовать классы bootstrap 21:22
            });
        });
        // закрытие модального окна
        close.addEventListener('click', () => {
           console.log(close);
            // когда нажимаем крестик, то закрываем все модальные окна
            windows.forEach(item => {
                item.style.display = 'none';
            });
             // закрытие
            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
        });
         // закрытие модального окна по подложке
        modal.addEventListener('click', (e) => {
            // если элемент на который кликнули (target)сторого равен тому элементу который показывали (modal)
            if (e.target === modal && closeClickOverlay) {
                // когда кликаем на подложку, то закрываются все модальные окна
                windows.forEach(item => {
                    item.style.display = 'none';
                });
            //  то повторяются все действия при клике на крестик
               modal.style.display = "none";
               document.body.style.overflow = ""; 
               document.body.style.marginRight = `0px`;
            }
        });
    }
// модальное окно котороё выскакивает по времени
    function showModalByTime(selector, time) {
        setTimeout(function() {
         // получаем модальное окно ,которое дожно выскочить и показываем его
         // document.querySelector(selector).style.display = 'block';
         // document.body.style.overflow = "hidden";
         let display;
         // получаем все модальные окна по атрибуту [data-modal] 
         // и перебираем элемент который находится в нутри
         document.querySelectorAll('[data-modal]').forEach(item => {
            // окна которые перебираются и одно из окон работает
               if (getComputedStyle(item).display !== 'none') {
                  //  и одно из окон работает
                  display = "block";
               }
         });
         // то
         // если ни одно из модальных окон неработает 
         if (!display) {
            // , то показываем то которое нужно
               document.querySelector(selector).style.display = 'block';
               document.body.style.overflow = "hidden";
         }
      }, time);
    }
    // чтобы страница недёргалась при открытии и закрытии модального окна 5:30
    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }
    // функция с аргументами (классами) для каждого модального окна
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');  // 9:50
    showModalByTime('.popup', 6000);
};

export default modals;