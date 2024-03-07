const nameExpression = /^[^\s]+[0-9A-Za-z\s]*[^\s]+$/g;
const emailExpression =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const movieApiURL = 'https://api.nomoreparties.co';
const mainApiURL = 'http://localhost:3000';
// const mainApiURL = 'https://api.psychodelic.movie.nomoredomainsmonster.ru'

export {
  nameExpression,
  emailExpression,
  movieApiURL,
  mainApiURL,
};