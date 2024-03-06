import React, { useEffect, useState, useContext } from 'react'

import { MoviesContext } from '../../contexts/MoviesContext'
import { IsLoadingContext } from './../../contexts/IsLoadingContext'

import './Movies.css'

import SearchForm from './../SearchForm/SearchForm'
import MoviesCardList from './../MoviesCardList/MoviesCardList'
import ButtonMore from './../ButtonMore/ButtonMore'

import { useViewport } from './../../hooks/useViewport'
import { useCountToShow } from './../../hooks/useCountToShow'

import {
  setStoreMovieSearchQuery,
  setStoreSearchedMovies,
  getStoreMovieSearchQuery,
  getStoreSearchedMovies,
} from './../../utils/storeMovieSearchData'

import {
  filterMoviesByName,
  filterShortMovies,
} from './../../utils/filterMovies.js'

import { movieSearchErrorMessages } from './../../constants/constants.js'
import { CONFIG } from './../../constants/config.js'
import MyButton from '../ui/MyButton/MyButton.jsx'
const { screenBreakPoints, initialCountToShow, stepsToShow } = CONFIG

export default function Movies({ fetchAllMovies, isApiError, setIsApiError }) {
  const { moviesList } = useContext(MoviesContext)
  const { isLoading, setIsLoading } = useContext(IsLoadingContext)

  const { width } = useViewport()
  const { initialCount, nextCount } = useCountToShow(
    width,
    screenBreakPoints,
    initialCountToShow,
    stepsToShow
  )

  const [index, setIndex] = useState(initialCount)
  const [isCompleted, setIsCompleted] = useState(true)
  const [moviesToShow, setMoviesToShow] = useState([])

  const [moviesFilter, setMoviesFilter] = useState(
    getStoreMovieSearchQuery() || { query: '', isShort: false }
  )
  const [searchedMovies, setSearchedMovies] = useState([])
  const [moviesToRender, setMoviesToRender] = useState([])

  useEffect(() => {
    const searchedMoviesFormStore = getStoreSearchedMovies()
    const searchQueryFormStore = getStoreMovieSearchQuery()
    if (
      searchedMoviesFormStore &&
      searchedMoviesFormStore.length !== 0 &&
      searchedMoviesFormStore
    ) {
      filterMoviesHandler(searchedMoviesFormStore, searchQueryFormStore)
    }
  }, [])

  useEffect(() => {
    if (searchedMovies.length !== 0) {
      setStoreSearchedMovies(searchedMovies)
    }
  }, [searchedMovies])

  useEffect(() => {
    setIndex(initialCount)
    setMoviesToShow(
      getMoviesToShow(moviesToRender, moviesToShow, 0, initialCount)
    )
    checkIfCompleted(initialCount)
  }, [moviesToRender, initialCount])

  const getMoviesToShow = (movies, showedMovies, start, end) => {
    const slicedMovies = movies.slice(start, end)
    return start === 0 ? slicedMovies : [...showedMovies, ...slicedMovies]
  }

  const checkIfCompleted = (i) => {
    i >= moviesToRender.length ? setIsCompleted(true) : setIsCompleted(false)
  }

  const showMoreHandler = () => {
    setMoviesToShow(getMoviesToShow(moviesToRender, moviesToShow, index, index + nextCount))
    setIndex(index + nextCount)
    checkIfCompleted(index + nextCount)
  }

  const filterMoviesHandler = (movies, filterQuery) => {
    const filteredMoviesByName = filterMoviesByName(movies, filterQuery.query)
    setSearchedMovies(filteredMoviesByName)
    if (!filterQuery.isShort) {
      setMoviesToRender(filteredMoviesByName)
    } else {
      const filteredMoviesByNameAndShort = filterShortMovies(
        filteredMoviesByName,
        filterQuery.isShort
      )
      setMoviesToRender(filteredMoviesByNameAndShort)
    }
  }

  const searchFormSubmitHandler = (data) => {
    const newMoviesFilter = { ...moviesFilter, query: data.search }
    if (moviesList.length === 0) {
      fetchAllMovies()
        .then((adaptedMovies) => {
          setStoreMovieSearchQuery(newMoviesFilter)
          setMoviesFilter(newMoviesFilter)

          filterMoviesHandler(adaptedMovies, newMoviesFilter)
        })
        .catch((err) => {
          console.error(err)
          setIsApiError(true)
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(true)
      setStoreMovieSearchQuery(newMoviesFilter)
      setMoviesFilter(newMoviesFilter)

      filterMoviesHandler(moviesList, newMoviesFilter)
      setIsLoading(false)
    }
  }

  const isShortChangeHandler = (e) => {
    const newMoviesFilter = { ...moviesFilter, isShort: e.target.checked }
    setMoviesFilter(newMoviesFilter)
    setStoreMovieSearchQuery(newMoviesFilter)

    const filteredMoviesByNameAndShort = filterShortMovies(
      searchedMovies,
      newMoviesFilter.isShort
    )
    setMoviesToRender(filteredMoviesByNameAndShort)
  }

  return (
    <main className="main">
      <SearchForm
        onSearchFormSubmit={searchFormSubmitHandler}
        onIsShortChangeHandler={isShortChangeHandler}
        moviesFilter={moviesFilter}
      />
      <section className="movies">
        {moviesToRender.length !== 0 ? (
          <MoviesCardList moviesToShow={moviesToShow} />
        ) : (
          (moviesList.length !== 0 && (
            <p className="movies__message">
              {movieSearchErrorMessages.notFoundError}
            </p>
          )) ||
          (isApiError && (
            <p className="movies__message movies__message_type_error">
              {movieSearchErrorMessages.serverError}
            </p>
          ))
        )}
        {!isCompleted && (
          <ButtonMore onClick={showMoreHandler} /> 
        )}
      </section>
    </main>
  )
}
