import apiRequest from './request';
import './styles.css';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import debounce from 'lodash.debounce';
import onceTemplate from './template/onceTemplate.hbs';
import listTemplate from './template/listTemplate.hbs';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';

const refs = {
  input: document.querySelector('#search'),
  result: document.querySelector('.result'),
};

refs.input.addEventListener('input', debounce(inputHandler, 500));

function inputHandler(e) {
  const searchValue = e.target.value;

  apiRequest(searchValue, importTemplate);
}

// function apiRequest(requestValue) {
//   if (requestValue.length === 0) {
//     return;
//   }
//   fetch(BASE_URL + requestValue)
//     .then(response => response.json())
//     .then(d => importTemplate(d));
// }

function importTemplate(d) {
  const res = refs.result;

  const dataArrLength = d.length;
  res.innerHTML = '';
  if (dataArrLength === 1) {
    const readyMarkup = onceTemplate(d);
    res.insertAdjacentHTML('beforeend', readyMarkup);
  } else if (dataArrLength >= 2 && dataArrLength <= 10) {
    const readyMarkup = listTemplate(d);
    res.insertAdjacentHTML('beforeend', readyMarkup);
  } else {
    PNotify.error({ text: 'эээээ, ашыбка' });
  }
}
