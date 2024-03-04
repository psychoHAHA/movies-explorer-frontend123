import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

import * as mainApi from '../../utils/MainApi'
// import moviesApi from '../../utils/MoviesApi'

// import * as moviesApi from '../../utils/MoviesApi'

import './App.css'

import Main from '../Main/Main'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Movies from '../Movies/Movies'
import Profile from '../Profile/Profile'
import SavedMovies from '../SavedMovies/SavedMovies'
import ErrorNotFound from '../ErrorNotFound/ErrorNotFound'

export default function App() {
  const [currentUser, setCurrentUser] = useState()
  const loggedInFromStorage = JSON.parse(localStorage.getItem('loggedIn'))
  const [loggedIn, setLoggedIn] = useState(JSON.parse(loggedInFromStorage))
  const [isPreloading, setIsPreloading] = useState(false)
  const [email, setEmail] = useState('')
  const [setFormValue] = useState({
    email: '',
    password: '',
  })

  const [movies, setMovies] = useState([]) // с сервера
  const [savedMovies, setSavedMovies] = useState([]) 

  const navigate = useNavigate()

  const checkToken = () => {
    const token = localStorage.getItem('jwt')

    if (token) {
      mainApi.checkToken(token).then((res) => {
        setLoggedIn(true)
        localStorage.setItem('loggedIn', 'true')
      }).catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  const handleRegister = (name, email, password) => {
    setIsPreloading(true)
    mainApi
      .register(name, email, password)
      .then(() => {
        navigate('/signin', { replace: true })
      })

      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsPreloading(false)
      })
  }

  const handleLogin = (email, password) => {
    setIsPreloading(true)
    mainApi
      .authorize(email, password)
      .then((res) => {
        setLoggedIn(true)
        localStorage.setItem('jwt', res.jwt)
        localStorage.setItem('loggedIn', 'true')
        navigate('/movies', { replace: true })
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsPreloading(false)
      })
  }

  const logout = () => {
    setLoggedIn(false)
    setCurrentUser({})
    localStorage.clear()
    localStorage.setItem('loggedIn', 'false')
    navigate('/', { replace: true })
  }

  // function fetchAllMovies() {

  //   return moviesApi.getMovies().then((movies) => {
  //     const adaptedMovies = movies.map((movie) =>
  //     moviesApi.moviesDataAdapter(movie));
  //     setMovies(adaptedMovies);
  //     return adaptedMovies;
  //   });
  // }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, loggedIn, setLoggedIn }}>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Main />}></Route>

          <Route
            path="/signup"
            element={
              <Register
                onRegister={handleRegister}
                loggedIn={loggedIn}
                isPreloading={isPreloading}
              />
            }
          ></Route>
          <Route
            path="/signin"
            element={
              <Login
                onLogin={handleLogin}
                setEmail={setEmail}
                loggedIn={loggedIn}
                isPreloading={isPreloading}
              />
            }
          ></Route>
          {/* <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute element={<Profile />} loggedIn={loggedIn} />
            }
          ></Route> */}
          <Route exact path='/profile' element={<Profile onLogout={logout} />} />
          {/* <Route
            exact
            path="/movies"
            element={
              <ProtectedRoute loggedIn={loggedIn} element={<Movies />} />
            }
          /> */}

          <Route exact path='/movies' element={<Movies fetchAllMovies={fetchAllMovies} />}/>
          <Route exact path='/saved-movies' element={<Movies />} /> 
          {/* <Route
            exact
            path="/saved-movies"
            element={
              <ProtectedRoute element={<SavedMovies />} loggedIn={loggedIn} />
            }
          /> */}
          <Route exact path="/404" element={<ErrorNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}
