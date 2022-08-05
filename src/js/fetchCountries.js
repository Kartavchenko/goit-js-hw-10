import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class ApiServise {

    constructor() {
    }

  fetchCountries(name) {
    const URL_API = 'https://restcountries.com/v2';
    
  return fetch(`${URL_API}/name/${name}?fields=name,capital,population,languages,flags`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
};
}