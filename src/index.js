import './scss/main';
import country from './templates/country.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
const debounce = require('lodash.debounce');
const URL = 'https://restcountries.eu/rest/v2/name/';

const input = document.querySelector('.input');
const rendered = document.querySelector('.rendered');

function render(data) {
  if (data.length > 1 && data.length < 11) {
    let html = '<ul>';
    data.forEach(item => {
      html += `<li>${item.name}</li>`;
    });
    rendered.innerHTML = html + '</ul>';
  } else if (data.length === 1) {
    rendered.innerHTML = country(data);
    console.log(data);
  } else {
    rendered.innerHTML = '';
    error({ text: 'Too many matches found. Please enter a more specific query' });
  }
}

input.addEventListener(
  'input',
  debounce(e => {
    rendered.innerHTML = '';
    if (e.target.value) {
      fetch(`${URL}${e.target.value}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data) {
            render(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, 500),
);
