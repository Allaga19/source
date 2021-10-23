// функция которая отвечает за отправку запроса
   // const postData = async (url, data) => {
   //    let res = await fetch(url, {
   //       // настраиваем что должно происходить
   //       method: "POST",
   //       body: data
   //    });
   //    // await показывает js, что надо дождаться результат запроса
   //    return await res.text();
   // };

   // const getResource = async (url) => {
   //    let res = await fetch(url);

   //    if (!res.ok) {
   //       throw new Error(`Could not fetch ${url}, status: ${res.status}`);
   //    }

   //    return await res.json();
   // };
   
   // export {postData, getResource};


   const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        body: data
    });

    return await res.text();
};

const getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export {postData, getResource};



