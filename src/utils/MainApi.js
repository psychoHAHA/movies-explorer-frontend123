// // export const BASE_URL = "https://psychodelic.movie.nomoredomainsmonster.ru"
// // export const BASE_URL = 'https://api.psychodelic.movie.nomoredomainsmonster.ru'

// export const BASE_URL = "http://localhost:3000";

// function getResponse(response) {
//   if (response.ok) {
//     return response.json();
//   }

//   return Promise.reject(new Error("Возникла ошибка"));
// }

// export const register = (name, email, password) => {
//   return fetch(`${BASE_URL}/signup`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name, email, password }),
//   })
//     .then((response) => getResponse(response))
//     .catch((error) => console.log(error));
// };

// export const authorize = (email, password) => {
//   return fetch(`${BASE_URL}/signin`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   }).then((response) => getResponse(response));
// };

// export const checkToken = (jwt) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${jwt}`,
//     },
//   }).then((res) => getResponse(res));
// };

// export const getUserInfo = () => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   }).then((res) => getResponse(res));
// };

// export const getMovies = () => {
//   return fetch(`${BASE_URL}/movies`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   }).then((response) => getResponse(response))
// };

import { CONFIG } from './../constants/config.js'

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return res.json().then((err) => {
        return Promise.reject(`Ошибка: ${res.status} ${err.message}`)
      })
    }
  }

  // Add token to headers
  setAuthorizationHeader(token) {
    this._headers = {
      ...this._headers,
      authorization: `Bearer ${token}`,
    }
  }

  // Get current user info
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._getResponse)
  }

  setUserInfo({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, email }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((err) => {
          return Promise.reject(err);
        });
      }
    });
  }

  // setUserInfo({ name, email }) {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: 'PATH',
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       name,
  //       email,
  //     }),
  //   }).then(this._getResponse)
  // }

  // Create new user
  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    })
  }

  // Sign in
  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
  }

  // Check JWT token
  tokenCheck(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    })
  }

  // createMovie({
  //   country,
  //   director,
  //   duration,
  //   year,
  //   description,
  //   image,
  //   trailerLink,
  //   thumbnail,
  //   nameRU,
  //   nameEN,
  //   movieId,
  // }) {
  //   return fetch(`${this._baseUrl}/movies`, {
  //     method: "POST",
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       country,
  //       director,
  //       duration,
  //       year,
  //       description,
  //       image,
  //       trailerLink,
  //       thumbnail,
  //       nameRU,
  //       nameEN,
  //       movieId,
  //     }),
  //   }).then(this._getResponse);
  // }

  createMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._getResponse)
  }

  // Delete movie card
  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponse)
  }

  // Get saved movies
  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._getResponse)
  }
}

const mainApi = new MainApi(CONFIG.mainApiConfig)

export default mainApi
