import Notiflix from 'notiflix';

export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        Notiflix.Notify.warning('Oops, there is no country with that name');
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      throw new Error(error);
    });
}
