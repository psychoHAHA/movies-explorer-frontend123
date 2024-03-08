import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import './App.css'

import Main from '../Main/Main'
import Layout from '../Layout/Layout'
import Movies from './../Movies/Movies'
import SavedMovies from './../SavedMovies/SavedMovies'
import Profile from './../Profile/Profile'
import Login from './../Login/Login'
import Register from './../Register/Register'
import ErrorNotFound from './../ErrorNotFound/ErrorNotFound'
import ProtectedRoute from './../ProtectedRoute/ProtectedRoute'

import { CurrentUserContext } from './../../contexts/CurrentUserContext'
import { MoviesContext } from '../../contexts/MoviesContext'

import mainApi from './../../utils/MainApi'
import movieApi from './../../utils/MoviesApi'
import moviesData from './../../utils/moviesDataAdapter.js'

function App() {
  const navigate = useNavigate()

  const loggedInFromStorage = JSON.parse(localStorage.getItem('loggedIn'))

  const [isApiError, setIsApiError] = useState(false)
  const [loggedIn, setLoggedIn] = useState(JSON.parse(loggedInFromStorage))
  const [moviesList, setMoviesList] = useState([])
  const [savedMoviesList, setSavedMoviesList] = useState([])

  const [currentUser, setCurrentUser] = useState({})

  function checkToken(token) {
    const path = location.pathname
    mainApi
      .tokenCheck(token)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            return Promise.reject(`Ошибка: ${res.status} ${err.message}`)
          })
        } else {
          setLoggedIn(true)
          localStorage.setItem('loggedIn', 'true')
        }
      })
      .catch((err) => {
        console.log(err)
        navigate(path, { replace: true })
      })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken(token)
    }
  }, [])

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('token')

      mainApi.setAuthorization(token)
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
        .then(([userData, savedMovies]) => {
          setCurrentUser(userData)
          setSavedMoviesList(savedMovies)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [loggedIn])

  const handleRegister = (name, email, password) => {
    return mainApi.register(name, email, password).then((res) => {
      if (!res.ok) {
        return Promise.reject(res)
      } else {
        return res.json().then((res) => {
          if (res._id) {
            handleLogin({ email, password })
          }
          navigate('/signin')
        })
      }
    })
  }

  const handleLogin = (email, password) => {
    return mainApi.authorize(email, password).then((res) => {
      if (!res.ok) {
        return Promise.reject(res)
      } else {
        return res.json().then((res) => {
          setLoggedIn(true)
          localStorage.setItem('token', res.token)
          localStorage.setItem('loggedIn', 'true')
          navigate('/movies')
        })
      }
    })
  }

  const handleLogout = () => {
    setLoggedIn(false)
    setCurrentUser({})
    localStorage.removeItem('token')
    localStorage.clear()
    localStorage.setItem('loggedIn', 'false')
    navigate('/', { replace: true })
  }

  const getAllMovies = () => {
    return movieApi.getMovies().then((movies) => {
      const adaptedMovies = movies.map((movie) => moviesData(movie))
      setMoviesList(adaptedMovies)
      setIsApiError(false)
      return adaptedMovies
    })
  }

  const saveMovie = (movie) => {
    return mainApi.createMovie(movie).then((movieData) => {
      setSavedMoviesList([...savedMoviesList, movieData])
    })
  }

  const deleteMovie = (movieId) => {
    const savedMovie = savedMoviesList.find((item) => item.movieId === movieId)
    return mainApi.deleteMovie(savedMovie._id).then((res) => {
      setSavedMoviesList(
        savedMoviesList.filter((movie) => movie._id !== savedMovie._id)
      )
      return res
    })
  }

  return (
    <>
      <CurrentUserContext.Provider
        value={{ currentUser, setCurrentUser, loggedIn, setLoggedIn }}
      >
        <MoviesContext.Provider
          value={{
            moviesList,
            setMoviesList,
            savedMoviesList,
            setSavedMoviesList,
            saveMovie,
            deleteMovie,
          }}
        >
          <Routes>

          <Route
              path="signin"
              element={<Login onLogin={handleLogin} loggedIn={loggedIn} />}
            />

            <Route
              path="signup"
              element={
                <Register onRegister={handleRegister} loggedIn={loggedIn} />
              }
            />

            <Route path="/" element={<Layout />}>
              <Route index element={<Main />} />

              <Route
                path="movies"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Movies
                      getAllMovies={getAllMovies}
                      isApiError={isApiError}
                      setIsApiError={setIsApiError}
                    />
                  </ProtectedRoute>
                }
              />

              <Route
                path="saved-movies"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <SavedMovies />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route
              path="profile"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Profile
                    onLogout={handleLogout}
                    isApiError={isApiError}
                    setIsApiError={setIsApiError}
                  />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<ErrorNotFound />} />
          </Routes>
        </MoviesContext.Provider>
      </CurrentUserContext.Provider>
    </>
  )
}

export default App

// import './App.css'

// import { useEffect, useState } from 'react'
// import { Routes, Route, useNavigate } from 'react-router-dom'

// import Layout from '../Layout/Layout'
// import Main from '../Main/Main'
// import Register from '../Register/Register'
// import Login from '../Login/Login'

// import Movies from '../Movies/Movies'

// import mainApi from '../../utils/MainApi'
// import movieApi from '../../utils/MoviesApi'

// import movieApiURL from '../../constants/constants.js'
// import { CurrentUserContext } from '../../contexts/CurrentUserContext.jsx'
// import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute'
// import {
//   moviesContext,
//   MoviesContext,
// } from '../../contexts/MoviesContext.jsx'

// function App() {
//   const navigate = useNavigate()

//   const loggedInLocalStorage = JSON.parse(localStorage.getItem('loggedIn'))
//   const [currentUser, setCurrentUser] = useState({})
//   const [loggedIn, setLoggedIn] = useState(JSON.parse(loggedInLocalStorage))

//   const [moviesList, setMoviesList] = useState([])
//   const [savedMoviesList, setSavedMoviesList] = useState([])

//   const dataMovies = (movie) => {
//     const {
//       country,
//       director,
//       duration,
//       year,
//       description,
//       image,
//       trailerLink,
//       nameRU,
//       nameEN,
//       id: movieId,
//     } = movie

//     return {
//       country,
//       director,
//       duration,
//       year,
//       description,
//       image: `${movieApiURL}${image.url}`,
//       trailerLink,
//       thumbnail: `${movieApiURL}${image.formats.thumbnail.url}`,
//       nameRU,
//       nameEN,
//       movieId,
//     }
//   }

//   const checkToken = (token) => {
//     const path = location.pathname
//     mainApi
//       .tokenCheck(token)
//       .then((res) => {
//         if (!res.ok) {
//           console.log('error')
//         } else {
//           setLoggedIn(true)
//           localStorage.setItem('loggedIn', 'true')
//         }
//       })
//       .catch((err) => {
//         navigate(path, { replace: true })
//         console.log(err)
//       })
//   }

//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     if (token) {
//       checkToken(token)
//     }
//   }, [])

//   useEffect(() => {
//     if (loggedIn) {
//       const token = localStorage.getItem('token')

//       mainApi.setAuthorization(token)
//       Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
//         .then(([userData, savedMovies]) => {
//           setCurrentUser(userData)
//           setSavedMoviesList(savedMovies)
//         })
//         .catch((err) => {
//           console.log(err)
//         })
//     }
//   }, [loggedIn])

//   const handleRegister = (name, email, password) => {
//     return mainApi.register(name, email, password).then((res) => {
//       if (!res.ok) {
//         console.log('error')
//       } else {
//         return res.json().then((res) => {
//           if (res._id) {
//             handleLogin({ email, password })
//           }
//           navigate('/signin')
//         })
//       }
//     })
//   }

//   const handleLogin = (email, password) => {
//     return mainApi.authorize(email, password).then((res) => {
//       if (!res.ok) {
//         return console.log('error')
//       } else {
//         return res.json().then((res) => {
//           setLoggedIn(true)
//           localStorage.setItem('token', res.token)
//           localStorage.setItem('loggedIn', 'true')
//           navigate('/movies')
//         })
//       }
//     })
//   }

//   const handleLogout = () => {
//     setLoggedIn(false)
//     setCurrentUser({})
//     localStorage.removeItem('token')
//     localStorage.clear()
//     localStorage.setItem('loggedIn', 'false')
//     navigate('/', { replace: true })
//   }

//   const getAllMovies = () => {
//     return movieApi.getMovies().then((movies) => {
//       const newMovies = movies.map((movie) => dataMovies(movie))
//       setMoviesList(newMovies)
//       return newMovies
//     })
//   }

//   const savedMovie = (movie) => {
//     return mainApi.createMovie(movie).then((movieData) => {
//       setSavedMoviesList([...savedMoviesList, movieData])
//     })
//   }

//   const deletedMovie = (movieId) => {
//     const savedMovie = savedMoviesList.find((i) => i.movieId === movieId)
//     return mainApi.deleteMovie(savedMovie._id).then((res) => {
//       setSavedMoviesList(
//         savedMoviesList.filter((movie) => movie._id !== savedMovie._id)
//       )
//       return res
//     })
//   }

//   return (
//     <>
//       <CurrentUserContext.Provider
//         value={{ loggedIn, setLoggedIn, currentUser, setCurrentUser }}
//       >
//         <MoviesContext.Provider
//           value={{
//             moviesList,
//             setMoviesList,
//             savedMovie,
//             deletedMovie,
//             savedMoviesList,
//             setSavedMoviesList,
//           }}
//         >
//           <Routes>
//             <Route path="/" element={<Layout />}>
//               <Route index element={<Main />} />
//               <Route
//                 path="movies"
//                 element={
//                   <ProtectedRoute loggedIn={loggedIn}>
//                     <Movies getAllMovies={getAllMovies} />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>
//           </Routes>
//         </MoviesContext.Provider>
//       </CurrentUserContext.Provider>
//     </>
//   )
// }
