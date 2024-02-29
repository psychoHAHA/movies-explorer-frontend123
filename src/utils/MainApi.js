// // export const BASE_URL = "https://psychodelic.movie.nomoredomainsmonster.ru"
// export const BASE_URL = 'https://api.psychodelic.movie.nomoredomainsmonster.ru'

// // export const BASE_URL = "http://localhost:3000"

// function getResponse(response) {
//   if (response.ok) {
//     return response.json()
//   }

//   return Promise.reject(new Error('Возникла ошибка'))
// }

// export const register = (name, email, password ) => {
//   return fetch(`${BASE_URL}/signup`, {
//     method: "POST",
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ name, email, password }),
//   }).then((response) => getResponse(response))
// }

// export const getUserInfo = () => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }).then(getResponse())
// }

// export const setUserInfo = ({ name, email }) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'PATCH',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ name, email }),
//   }).then((res) => {
//     if (res.ok) {
//       return res.json()
//     } else {
//       return res.json().then((error) => {
//         return Promise.reject(error)
//       })
//     }
//   })
// }

// export const checkToken = (jwt) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       'Content-Type': 'application/json',
//       "Authorization": `Bearer ${jwt}`
//     }
//   })
// }

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

  register({ name, email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    });
  }


  checkToken(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        authorization: `Bearer ${jwt}`,
      },
    });
  }
}

const mainApi = new MainApi({
  baseUrl: "https://api.psychodelic.movie.nomoredomainsmonster.ru",
  headers: {
    'Content-Type': 'application/json',
  }
})

export default mainApi
