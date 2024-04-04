// export const fakeApiCall = (mock) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(mock)
//     }
//       , 1000)
//   })
// }


export const fakeApiCall = (mock) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mock) {
        resolve(mock);
      } else {
        reject(new Error('No se pudo cargar los datos.'));
      }
    }, 1000);
  });
};
