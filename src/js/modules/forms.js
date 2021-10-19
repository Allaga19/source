// import checkNumInputs from './checkNumInputs';

const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');
        //   phoneInputs = document.querySelectorAll('input[name="user_phone"]');

   //  checkNumInputs('input[name="user_phone"]');
    /*// проверка номера телефона
    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
    // получаем то что ввел пользователь, используя регулярное выражение
    // пишем, что ищем нецыфры
    // тоесть если пользователь пишет не число, то регулярное выражение 
    // заменят его пустым местом, поэтому в тексте сотанутся только числа
            item.value = item.value.replace(/\D/, '');

        });
    });*/
    //создаём объект с сообщениями
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    // пути path по которым будут отправляться данные
    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    }
    // функция которая отвечает за отправку запроса
    const postData = async (url, data) => {
        let res = await fetch(url, {
            // настраиваем что должно происходить
            method: "POST",
            body: data
        });
        // await показывает js, что надо дождаться результат запроса
        return await res.text();
    };
    // функция очищения всех инпутов
    // переменная очистки формы
    const clearInputs = () => {
        // берём переменную inputs, воспользуемся forEach
        // берём каждый элемент по порядку item и получаем его атрибут value 19:15
        // и устанавливаем в него пустую строку
        inputs.forEach(item => {
            item.value = '';
        });
    };
    // перебираем все формы и на каждую форму навешиваем обрботчик события
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            // отменяем стандартное поведение браузера
            e.preventDefault();
            // создаём новый блок (div), где будут помещатся сообщения которые
            // расположены в объекте message, который будет создаваться при помощи скрипта
            // и только во время работы с формой
            let statusMessage = document.createElement('div');
            // добавляем класс блоку
            statusMessage.classList.add('status');
            // помещаем дополнительный блок statusMessage в родителя этой формы
            item.parentNode.appendChild(statusMessage);

             // добавляем класс анимации
            item.classList.add('animated', 'fadeOutUp');
             // скрываем форму
             setTimeout(() => {
                item.style.display = "none";
             }, 400);

            // отображение статуса сообщения спинер
            // создаём переменную для спинера
            let statusImg = document.createElement('img');
            // прописываем отрибуты спинеру
            statusImg.setAttribute('src', message.spinner);
            // анимация для спинера
            statusImg.classList.add('animated', 'fadeInUp');
            // вывод спинера на страницу
            statusMessage.appendChild(statusImg);
             // создаём переменную для текста
            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

        // собираем все данные какие есть в форме
        // создаём новую переменную formData во внутерь помещаем новый констуктор new FormData
        // и в скопках пишем ту форму (item) из которой хотим получить данные]
        const formData = new FormData(item);
        // формируем динамический путь куда будем отправлять данные
        let api;
        // находим определённый блок(item) по определунному селектору(.popup-design) выше себя по ерархии 12:03 тоесть родителей
        // если такой родитель есть то(?) присваиваем api = path.desinger
        // если(:) нет, то отправляем api = path.question
        item.closest('.popup-design') ? api = path.designer : api = path.question;
        console.log(api);
        // отправка запроса на сервер
        postData(api, formData)
            .then(res => {
                console.log(res);
                //изменение изображения
                statusImg.setAttribute('src', message.ok);
                // если успешно ушёл запрос
                textMessage.textContent = message.success;
            })
            // обработка ошибки при отправке формы
            .catch(() => {
                statusImg.setAttribute('src', message.fail);
                textMessage.textContent = message.failure;
            })
            // команда из промисов
            .finally(() => {
                // очищение формы после отправки
                clearInputs();
                // устанавливаем анонимный таймаут
                setTimeout(() => {
                    statusMessage.remove();
                    // после того как удалится изображение
                    item.style.display = 'block';
                    // удаляем класс скрытия формы
                    item.classList.remove('fadeOutUp');
                    // добавляем клас кросивого появления формы
                    item.classList.add('fadeInUp');
                }, 5000);
            });
        });
    });
};

export default forms;