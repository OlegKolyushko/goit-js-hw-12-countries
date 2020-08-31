const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

export default function apiRequest(requestValue, callback) {
  if (requestValue.length === 0) {
    return;
  }
  fetch(BASE_URL + requestValue)
    .then(response => response.json())
    .then(d => callback(d));
}
