// валидация input 
const checkTextInputs = (selector) => {
   const txtInputs = document.querySelectorAll(selector);

   txtInputs.forEach(input => {
      // отслеживаем событие когда пользователь нажал на определённую клавишу keypress
      // затем переходим в function и указываем объект события (e)
      input.addEventListener('keypress', function(e) {
         if (e.key.match(/[^а-яё 0-9]/ig)) {
            e.preventDefault();
         }
      });
   });
};

export default checkTextInputs;