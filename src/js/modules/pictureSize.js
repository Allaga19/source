const pictureSize = (imgSelector) => {
   const blocks = document.querySelectorAll(imgSelector);
   // мышка входит в пределы блока
   function showImg (block) {
      const img = block.querySelector('img');
      // something.png => something-1.png
      img.src = img.src.slice(0, -4) + '-1.png';
      // скрываем все парагрофы внутри блока
      // кроме хита продаж ('p:not(.sizes-hit)')
      block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
         p.style.display = 'none';
      });
   }
   // мышка выходит за пределы блока
   function hideImg (block) {
      const img = block.querySelector('img');
      // something-1.png => something.png
      img.src = img.src.slice(0, -6) + '.png';
      block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
         p.style.display = 'block';
      });
   }

   blocks.forEach(block => {
      // mouseover - когда мышь находится над элементом
      block.addEventListener('mouseover', () => {
         showImg(block);
      });
      // mouseout - мышь уходит из блока
      block.addEventListener('mouseout', () => {
         hideImg(block);
      });
   });
};

export default pictureSize;