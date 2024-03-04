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

class MoviesApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getResponse(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error("Возникла ошибка"));
  }

  getMovies() {
    return fetch(`${this._url}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponse);
  }

  moviesDataAdapter() {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      id: movieId,
    } = movie;

    return {
      country,
      director,
      duration,
      year,
      description,
      image: `${this._url}${image.url}`,
      trailerLink,
      // thumbnail: `${this._url}${image.formats.thumbnail.url}`,
      nameRU,
      nameEN,
      movieId,
    };
  }
}

const moviesApi = new MoviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
