// в selector будут вписываться те imput, которые нужны для валидации
const mask = (selector) => {

   // выделение курсором
   let setCursorPosition = (pos, elem) => {
      elem.focus();
      // для старых браузеров
      if (elem.setSelectionRange) {
         elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
         let range = elem.createTextRange();

         range.collapse(true);
         range.moveEnd('character', pos);
         range.moveStart('character', pos);
         range.select();
      }
   };
   function createMask(event) {
      let matrix = '+7 (___) ___ __ __',
        i = 0,
      // получаем все не-цифры, какие есть, и заменяем их на пустую строку
      // значение статичное работает на основе матрици
      def = matrix.replace(/\D/g, ''),
       // значение динамичное, работает на основе того, что ввёл пользователь
      val = this.value.replace(/\D/g, '');
      // запрет на удаление +7
      if (def.length >= val.length) {
         val = def;
      }
      // берём значение, которое пользователь ввёл сейчас и по мере
      // заполнения удаляем скобки и нижнее подчёркивание 6:21
      this.value = matrix.replace(/./g, function(a) {
         return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });
      // очищение input
      if (event.type === 'blur') {
         if (this.value.length == 2) {
            this.value = '';
         }
      } else {
         setCursorPosition(this.value.length, this);
      }
   }
   let inputs = document.querySelectorAll(selector);

   inputs.forEach(input => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
   });
};
export default mask;