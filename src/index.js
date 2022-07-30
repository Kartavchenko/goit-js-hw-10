import './css/styles.css';
import { getCountries } from "./fetchCountries";
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const contriesUrl = getCountries;

const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

const URL_API = 'https://restcountries.com/v2';
const DEBOUNCE_DELAY = 300;

input.addEventListener("input", debounce(searchCountries, DEBOUNCE_DELAY));

function searchCountries() {
  const inputValue = input.value.trim();
  fetchCountries(inputValue)
    .then(showOnCountries);
  if (inputValue === "") {
    countryList.innerHTML = "";
  }
}

function showOnCountries(name) {

  if (name.length <= 10) {
    const markupName = name.map((country) => {
      return `<li><img src ="${country.flags.svg}" width = "20" heigth = "20"/>
      ${country.name}</.li>`
    })
      .join("");
    
    countryList.innerHTML = markupName;
  }
  if (name.length >= 10) {
    Notify.info("Too many matches found. Please enter a more specific name.")
  }
  if (name.length === 1) {
    dataOfCountry(name);
  }
  if (name.length > 1) {
    countryInfo.innerHTML = "";
  };
};

function dataOfCountry(name) {
  const markupData = name.map(data => {
    return `<div>Capital: ${data.capital}</div>
    <div>Population: ${data.population}</div>
    <div>Languages: ${data.languages}</div>`
  }).join("");
  countryInfo.innerHTML = markupData;
}

function fetchCountries(name) {
  return fetch(`${URL_API}/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
      if (!response.ok) {
        Notify.failure("Oops, there is no country with that name");
        throw new Error(response.status);
      }
      return response.json();
    });
};