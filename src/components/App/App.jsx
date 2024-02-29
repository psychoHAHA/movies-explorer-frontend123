import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

import mainApi from '../../utils/MainApi'

import './App.css'

import Main from '../Main/Main'
import ProtectedRoute from '../ProtectedRoute'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Movies from '../Movies/Movies'
import Profile from '../Profile/Profile'
import SavedMovies from '../SavedMovies/SavedMovies'
import ErrorNotFound from '../ErrorNotFound/ErrorNotFound'

export default function App() {
  const [currentUser, setCurrentUser] = useState()
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [setFormValue] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleRegister = (name, email, password) => {
    mainApi
      .register(name, email, password)
      .then(() => {
        navigate('/sign-in', { replace: true });
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const checkToken = () => {
    const token = localStorage.getItem('jwt');

    if (token) {
      mainApi
        .getContent(token)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate('/', { replace: true });
        })

        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Main />}></Route>

          <Route
            exact
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          ></Route>
          <Route exact path="/signin" element={<Login />}></Route>
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute element={<Profile />} loggedIn={loggedIn} />
            }
          ></Route>
          <Route
            exact
            path="/movies"
            element={
              <ProtectedRoute element={<Movies />} loggedIn={loggedIn} />
            }
          />
          <Route
            exact
            path="/saved-movies"
            element={
              <ProtectedRoute element={<SavedMovies />} loggedIn={loggedIn} />
            }
          />
          <Route exact path="/404" element={<ErrorNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}
