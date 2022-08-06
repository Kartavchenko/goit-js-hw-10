import './css/styles.css';
import newApiService from "./js/fetchCountries";
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

const serviceApi = new newApiService();

const DEBOUNCE_DELAY = 300;

input.addEventListener("input", debounce(searchCountries, DEBOUNCE_DELAY));

function searchCountries() {
  const inputValue = input.value.trim();
  serviceApi.fetchCountries(inputValue)
    .then(showOnCountries)
    .catch((error) => { Notify.failure("Oops, there is no country with that name"), countryList.innerHTML = "", countryInfo.innerHTML = "" });
};

function showOnCountries(name) {
  // if (name.length === 0) {
  //   countryList.innerHTML = "";
  // }
  if (name.length <= 10) {
    const markupName = name.map((country) => {
      return `<li><img src ="${country.flags.svg}" width = "20" heigth = "20"/>
      ${country.name}</.li>`
    })
      .join("");
    countryList.innerHTML = markupName;
  }
  if (name.length > 10) {
    Notify.info("Too many matches found. Please enter a more specific name.")
    countryList.innerHTML = "";
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
    <div>Languages: ${data.languages.map(lang =>
      Object.values(lang.name).join(""))}</div>`
  }).join("");
  countryInfo.innerHTML = markupData;
};