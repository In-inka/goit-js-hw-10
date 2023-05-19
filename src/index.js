import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const search = document.querySelector('#search-box');

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
search.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(evt) {
  evt.preventDefault();
  let nameCountry = evt.target.value.trim();

  if (nameCountry === '') {
    return resetNameCountry();
  }

  fetchCountries(nameCountry)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if ((countries.length > 2) & (countries.length < 10)) {
        resetNameCountry();
        const markup = countries
          .map(country => {
            return `<li>
            <img src="${country.flags.svg}" alt="${country.name.official}" width = 25>
            ${country.name.official}
            </li>`;
          })
          .join('');
        countryList.innerHTML = markup;
      } else if (countries.length === 1) {
        resetNameCountry();
        const markupInfo = countries
          .map(country => {
            return `<ul>
            <li class ="country-info-title">
              <img
                src="${country.flags.svg}"
                alt="${country.name.official}"
                width="25"
              />
             <b>${country.name.official}</b>
            </li>
            <li ><b>Capital: </b>${country.capital}</li>
            <li >
              <b>Population: </b>${country.population}
            </li>
            <li ><b>Languages: </b>${Object.values(country.languages).join(
              ', '
            )}</li>
          </ul>`;
          })
          .join('');
        countryInfo.innerHTML = markupInfo;
      }
    })
    .catch(error => console.log(error));
}

function resetNameCountry() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
