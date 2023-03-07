export function fetchCountries(name) {
  const url = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`;

  return fetch(url).then(response => response.json());
}


// const BASE_URL = 'https://restcountries.com/v3.1';

// function fetchCountries(name) {
//     return fetch(`${BASE_URL}/name/${name}`).then(response =>
//         response.json(),
//     );
// }
 
// export default { fetchCountries };  