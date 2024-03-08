<<<<<<< HEAD
import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

import React, { useState, useContext, useEffect } from 'react'

import { MoviesContext } from '../../contexts/MoviesContext'

import {
  filterMoviesName,
  filterMovies,
} from './../../utils/filterMovies.js'

export default function SavedMovies() {
  const { savedMoviesList } = useContext(MoviesContext)

  const [moviesFilter, setMoviesFilter] = useState({
    query: '',
    isShort: false,
  })

  const [searchedMovies, setSearchedMovies] = useState([])
  const [moviesToRender, setMoviesToRender] = useState([])

  useEffect(() => {
    filterMoviesHandler(savedMoviesList, moviesFilter)
  }, [moviesFilter, savedMoviesList])

  const filterMoviesHandler = (movies, filterQuery) => {
    const filteredMoviesByName = filterMoviesName(movies, filterQuery.query)
    setSearchedMovies(filteredMoviesByName)
    if (!filterQuery.isShort) {
      setMoviesToRender(filteredMoviesByName)
    } else {
      const filteredMoviesByNameAndShort = filterMovies(
        filteredMoviesByName,
        filterQuery.isShort
      )
      setMoviesToRender(filteredMoviesByNameAndShort)
    }
  }

  const searchFormSubmitHandler = (data) => {
    const newMoviesFilter = { ...moviesFilter, query: data.search }
    setMoviesFilter(newMoviesFilter)
    filterMoviesHandler(savedMoviesList, newMoviesFilter)
  }

  const handleFilterMovies = (e) => {
    const newMoviesFilter = { ...moviesFilter, isShort: e.target.checked }
    setMoviesFilter(newMoviesFilter)

    const filteredMoviesByNameAndShort = filterMovies(
      searchedMovies,
      newMoviesFilter.isShort
    )
    setMoviesToRender(filteredMoviesByNameAndShort)
  }

  return (
    <>
      <main className="main">
        <SearchForm
          onSearchFormSubmit={searchFormSubmitHandler}
          onHandleShortChange={handleFilterMovies}
          moviesFilter={moviesFilter}
        />
        {savedMoviesList.length !== 0 && (
          <div className='saved-movies'>
            {moviesToRender.length !== 0 ? (
          <MoviesCardList moviesToShow={moviesToRender} />
        ) : (
          (savedMoviesList.length !== 0 && (
            console.log(123)
          ))
        )}
          </div>
        )}
      </main>
=======
import "./SavedMovies.css"
import Header from "../Header/Header"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"

export default function SavedMovies() {
  return (
    <>
      <div className="saved-movie">
        <Header />
        <SearchForm />
        <MoviesCardList />
        <Footer />
      </div>
>>>>>>> main
    </>
  )
}
