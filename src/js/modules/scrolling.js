const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            // когда пролистали больше 1650
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            // когда пролистали меньше 1650
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    // Scrolling with raf

    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.3;
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);
            // анимация
            function step(time) {
                // определяем какой раз запускается анимация
                // и это условие выполнится только один раз
                if (start === null) {
                    start = time;
                }
                // переменная вычесляет старт и время
                let progress = time - start,
                // количество пикселей которое надо пролистать
                // в течении этой анимации
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

                    document.documentElement.scrollTo(0, r);
                // когда анимация должна остановится
                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });
/*
// использование только js 
    // Pure js scrolling
    const element = document.documentElement,
          body = document.body;
   // функция подсчета сколько пролистано и что делать
    const calcScroll = () => {
        upElem.addEventListener('click', function(event) {
            // какое растояние пролистано от верха 11:38
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);
            // проверяем хэш (hash)
            if (this.hash !== '') {
                event.preventDefault();
                // получаем элемент к которому будем скролить
                let hashElement = document.querySelector(this.hash),
                // сколько пролистать пикселей до родителя элемента
                    hashElementTop = 0;
                // вычисляем значение hashElementTop 
                // перебирая всех родителей элемента
                while (hashElement.offsetParent) {
                    hashElementTop += hashElement.offsetTop;
                    hashElement = hashElement.offsetParent;
                }
                // округляем полученное число
                hashElementTop = Math.round(hashElementTop);
                smoothScroll(scrollTop, hashElementTop, this.hash);
            }
        });
    };

    const smoothScroll = (from, to, hash) => {
        let timeInterval = 1,
            prevScrollTop,
            speed;
        // определяем в какую сторону двигаемся
        if (to > from) {
            speed = 30;
        } else {
            speed = -30;
        }
        // анимация
        let move = setInterval(function() {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);

            if (
                prevScrollTop === scrollTop ||
                (to > from && scrollTop >= to) ||
                (to < from && scrollTop <= to)
            ) {
                clearInterval(move);
                history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
            } else {
                // скорость движения страницы
                body.scrollTop += speed;
                element.scrollTop += speed;
                prevScrollTop = scrollTop;
            }
        }, timeInterval);
    };

    calcScroll();*/
};

export default scrolling;