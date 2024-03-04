import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm'
import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import ButtonMore from '../ButtonMore/ButtonMore'
import Footer from '../Footer/Footer'

export default function Movies() {

  return (
    <>
      <div className="movies">
        <Header />
        <SearchForm />
        <MoviesCardList />
        <ButtonMore />
        <Footer />
      </div>
    </>
  )
}
