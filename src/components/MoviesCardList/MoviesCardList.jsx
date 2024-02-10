import MoviesCard from "../MoviesCard/MoviesCard"
import "./MoviesCardList.css"

export default function MoviesCardList() {
  return (
    <>
      <ul className="movies-cards-list">
        <MoviesCard />
      </ul>
    </>
  )
}