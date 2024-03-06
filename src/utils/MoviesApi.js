// const url = "https://api.nomoreparties.co/beatfilm-movies";

// function getResponse(response) {
//   if (response.ok) {
//     return response.json();
//   }

//   return Promise.reject(new Error("Возникла ошибка"));
// }

// export const getMovies = () => {
//   return fetch(`${url}`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   }).then((response) => getResponse(response));
// };

// export const dataMovies = (movie) => {
//   const {
//     country,
//     director,
//     duration,
//     year,
//     description,
//     // image,
//     trailerLink,
//     nameRU,
//     nameEN,
//     id: movieId,
//   } = movie;

//   return {
//     country,
//     director,
//     duration,
//     year,
//     description,
//     // image: `${url}${image.url}`,
//     trailerLink,
//     // thumbnail: `${url}${image.formats.thumbnail.url}`,
//     nameRU,
//     nameEN,
//     movieId,
//   };
// };

import { CONFIG } from './../constants/config.js';

class MovieApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((err) => {
        return Promise.reject(`Ошибка: ${res.status} ${err.message}`);
      });
    }
  }

  // Get movies
  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._getResponse);
  }
}

const movieApi = new MovieApi(CONFIG.movieApiConfig);

export default movieApi;