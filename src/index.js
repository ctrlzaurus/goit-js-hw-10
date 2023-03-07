import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries.js';

// const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const debounceSearch = debounce(() => {
    const searchTerm = searchBox.value.trim();
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  if (searchTerm === '') {
    return;
  }

  fetchCountries(searchTerm).then((countries) => {
      console.log(countries);
      countryEl(countries);
  });
}, 300);

searchBox.addEventListener('input', debounceSearch);

function countryEl(e) {
    // for (const iterator of e) {
    //     console.log(iterator.name);
    //     console.log(iterator.capital);
    //     console.log(iterator.population);
    //     console.log(iterator.languages.map((l) => l.name).join(', '));
    //     countryInfoCard(iterator);
    // }
    if (e.status === 404) {
        Notiflix.Notify.failure(
          `Oops, there is no country with that name`,
        {
        timeout: 2000,
        },
     );
    }  else if (e.length === 1) {
        countryInfoCard(...e);
    } else if (e.length >= 2 && e.length <= 10) {
        countryInfoList(e);
    } else {
        Notiflix.Notify.info(
          `Too many matches found. Please enter a more specific name.`,
        {
        timeout: 2000,
        },
     );
    }
    console.log(e);
}

function countryInfoCard(country) {
    const html = `
    <div class="info__card">
    <img src="${country.flags.svg}" alt="${country.name} flag" class="pictures">
    <p class="name"><b>${country.name}</b></p>
    </div>
    <p class="body__text"><b>Capital:</b> ${country.capital}</p>
    <p class="body__text"><b>Population:</b> ${country.population}</p>
    <p class="body__text"><b>Languages:</b> ${country.languages.map((l) => l.name).join(', ')}</p>
  `;
  countryInfo.innerHTML = html;
}

function countryInfoList(countries) {
    const countryElList = [];
    for (const country of countries) {
        countryElList.push(`
        <li class="info__list">
        <img src="${country.flags.svg}" alt="${country.name} flag" class="pictures">
        <p class="name">${country.name}</p>
        </li>
        `)
    }
    countryList.innerHTML = [...countryElList].join('');
}

