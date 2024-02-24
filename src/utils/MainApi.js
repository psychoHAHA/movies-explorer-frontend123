export const BASE_URL = "psychodelic.movie.nomoredomainsmonster.ru"

function getResponse(response) {
  if (response.ok) {
    return response.json()
  }

  return Promise.reject(new Error("Возникла ошибка"))
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",

    body: JSON.stringify({ name, email, password }),
  }).then((response) => getResponse(response))
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
    body: JSON.stringify({ email, password }),
  }).then((response) => getResponse(response))
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => getResponse(res))
    .then((data) => data)
}
