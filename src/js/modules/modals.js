const modals = () => {
    let btnPressed = false;
    // создаём функцию bindModal 
    // она отвичает за привязку модального окна к определённому тригеру
    // поэтому как аргументы передаём определённые параметры:
    // triggerSelector, modalSelector, closeSelector, closeClickOverlay
    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
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
                // проверка был ли клик покнопкам
                btnPressed = true;

                if (destroy) {
                    item.remove();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                    // добавляем класы анимация
                    item.classList.add('animated', 'fadeIn');
                });
                // открытие модального окна
                modal.style.display = "block";
                // чтобы страница под модальным окном непрокручивалась
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
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
            if (e.target === modal) {
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
            let display;
            // получаем все модальные окна по атрибуту [data-modal] 
            // и перебираем элемент который находится в нутри
            document.querySelectorAll('[data-modal]').forEach(item => {
                // окна которые перебираются и одно из окон работает 11:39
                if (getComputedStyle(item).display !== 'none') {
                    //  и одно из окон показывается
                    display = "block";
                }
            });
            // то
            // если ни одно из модальных окон неработает 
            if (!display) {
                // , то показываем то которое нужно
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = "hidden";
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    }
    
    // чтобы страница не дёргалась при открытии и закрытии модального окна 5:30
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
    // узнаём сколько пользователь пролестал страницу
    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            //  для старых браузеров включительно 12:30
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
            // если пользователь не кликнул ни на одну кнопку и долистал до конца
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                document.querySelector(selector).click();
            }
        });
    }

    // функция с аргументами (классами) для каждого модального окна
    // bindModal('кнопка клика', 'окно которое должно открываться', 'родитель крестика и клик(крестик) закрытия окна');
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');  // 9:50
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true); // 4:42
    openByScroll('.fixed-gift');
    //  showModalByTime('.popup-consultation', 5000);
};

export default modals;