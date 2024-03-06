import React, { useEffect, useState, useContext } from 'react'

import { MoviesContext } from '../../contexts/MoviesContext'

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

import { CONFIG } from './../../constants/config.js'

const { screenBreakPoints, initialCountToShow, stepsToShow } = CONFIG

export default function Movies({ getAllMovies }) {

  const { moviesList } = useContext(MoviesContext)

  const { width } = useViewport()
  
  const { initialCount, nextCount } = useCountToShow(
    width,
    screenBreakPoints,
    initialCountToShow,
    stepsToShow
  )

  const [isCompleted, setIsCompleted] = useState(true)

  const [moviesToShow, setMoviesToShow] = useState([])
  const [searchedMovies, setSearchedMovies] = useState([])
  const [moviesToRender, setMoviesToRender] = useState([])

  const [moviesFilter, setMoviesFilter] = useState(
    getStoreMovieSearchQuery() || { query: '', isShort: false }
  )

  const [index, setIndex] = useState(initialCount)

  useEffect(() => {
    const searchedMoviesFormStore = getStoreSearchedMovies()
    const searchQueryFormStore = getStoreMovieSearchQuery()
    if (
      searchedMoviesFormStore &&
      searchedMoviesFormStore.length !== 0 &&
      searchedMoviesFormStore
    ) {
      handleFilterMovies(searchedMoviesFormStore, searchQueryFormStore)
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
      getMoviesShow(moviesToRender, moviesToShow, 0, initialCount)
    )
    checkIfCompleted(initialCount)
  }, [moviesToRender, initialCount])

  const getMoviesShow = (movies, showedMovies, start, end) => {
    const slicedMovies = movies.slice(start, end)
    return start === 0 ? slicedMovies : [...showedMovies, ...slicedMovies]
  }

  const checkIfCompleted = (i) => {
    i >= moviesToRender.length ? setIsCompleted(true) : setIsCompleted(false)
  }

  const handleShowMore = () => {
    setMoviesToShow(
      getMoviesShow(moviesToRender, moviesToShow, index, index + nextCount)
    )
    setIndex(index + nextCount)
    checkIfCompleted(index + nextCount)
  }

  const handleSearchFormSubmit = (data) => {
    const newMoviesFilter = { ...moviesFilter, query: data.search }
    if (moviesList.length === 0) {
      getAllMovies()
        .then((adaptedMovies) => {
          setStoreMovieSearchQuery(newMoviesFilter)
          setMoviesFilter(newMoviesFilter)

          handleFilterMovies(adaptedMovies, newMoviesFilter)
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      setStoreMovieSearchQuery(newMoviesFilter)
      setMoviesFilter(newMoviesFilter)

      handleFilterMovies(moviesList, newMoviesFilter)
    }
  }

  const handleShortChange = (e) => {
    const newMoviesFilter = { ...moviesFilter, isShort: e.target.checked }
    setMoviesFilter(newMoviesFilter)
    setStoreMovieSearchQuery(newMoviesFilter)

    const filteredMoviesByNameAndShort = filterShortMovies(
      searchedMovies,
      newMoviesFilter.isShort
    )
    setMoviesToRender(filteredMoviesByNameAndShort)
  }

  const handleFilterMovies = (movies, filterQuery) => {
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

  return (
    <main className="main">
      <SearchForm
        onSearchFormSubmit={handleSearchFormSubmit}
        onhandleShortChange={handleShortChange}
        moviesFilter={moviesFilter}
      />
      <section className="movies">
        <MoviesCardList moviesToShow={moviesToShow} />

        {!isCompleted && <ButtonMore onClick={handleShowMore} />}
      </section>
    </main>
  )
}

// import './Movies.css'

// import React, { useEffect, useState, useContext } from 'react'

// import { CONFIG } from '../../constants/config'
// const { screenBreakPoints, initialCountToShow, stepsToShow } = CONFIG

// import { MoviesContext } from '../../contexts/MoviesContext'

// import SearchForm from '../SearchForm/SearchForm'

// import {
//   setStoreMovieSearchQuery,
//   setStoreSearchedMovies,
//   getStoreMovieSearchQuery,
//   getStoreSearchedMovies,
// } from './../../utils/storeMovieSearchData'

// import { useViewport } from '../../hooks/useViewport'
// import { useCountToShow } from './../../hooks/useCountToShow'

// export default function Movies({ getAllMovies }) {
//   const width = useViewport()

//   const { initialCount, nextCount } = useCountToShow(
//     width,
//     screenBreakPoints,
//     initialCountToShow,
//     stepsToShow
//   )

//   const [isCompleted, setIsCompleted] = useState(true)
//   const [movieShow, setMoviesShow] = useState([])
//   const [searchMovie, setSeatchMovie] = useState([])
//   const [renderMovies, setRenderMovies] = useState([])

//   const [index, setIndex] = useState(initialCount)

//   const [moviesFilter, setMoviesFilter] = useState(
//     getStoreMovieSearchQuery() || { query: '', isShort: false }
//   )

//   const handleFilterMovies = (movies, filterQuery) => {
//     const filteredMoviesByName = filterMoviesByName(movies, filterQuery.query)
//     setSearchedMovies(filteredMoviesByName)
//     if (!filterQuery.isShort) {
//       setMoviesToRender(filteredMoviesByName)
//     } else {
//       const filteredMoviesByNameAndShort = filterShortMovies(
//         filteredMoviesByName,
//         filterQuery.isShort
//       )
//       setMoviesToRender(filteredMoviesByNameAndShort)
//     }
//   }

//   useEffect(() => {
//     const searchedMoviesFormStore = getStoreSearchedMovies()
//     const searchQueryFormStore = getStoreMovieSearchQuery()
//     if (
//       searchedMoviesFormStore &&
//       searchedMoviesFormStore.length !== 0 &&
//       searchedMoviesFormStore
//     ) {
//       handleFilterMovies(searchedMoviesFormStore, searchQueryFormStore)
//     }
//   })
// }
