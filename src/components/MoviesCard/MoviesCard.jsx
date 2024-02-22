import "./MoviesCard.css"
import movie1 from "../../images/movie1.png"
import movie2 from "../../images/movie2.png"
import movie3 from "../../images/movie3.png"

export default function MoviesCard() {
  
  return (
    <>
      <li className="movies-card">
        <a
          href="#"
          className="movies-cardBD__link"
          target="_blank"
          rel="noreferrer"
        >
          <img src={movie1} alt="обложка кина" className="movies-card__image" />
        </a>
        <button className="movies-card__button">Сохранить</button>
        <div className="movies-card__container">
          <h1 className="movies-card__title">Киноальманах «100 лет дизайна»</h1>
          <p className="movies-card__time">1ч 17м</p>
        </div>
      </li>

      <li className="movies-card">
        <a href="#" className="movies-card__link">
          <img src={movie2} alt="обложка кина" className="movies-card__image" />
        </a>
        <button className="movies-card__button movies-card__button-selected">Сохранить</button>
        <div className="movies-card__container">
          <h1 className="movies-card__title">В погоне за Бенкси</h1>
          <p className="movies-card__time">1ч 17м</p>
        </div>
      </li>

      <li className="movies-card">
        <a href="#" className="movies-card__link">
          <img src={movie3} alt="обложка кина" className="movies-card__image" />
        </a>
        <button className='movies-card__button movies-card__button-cross'
        >Сохранить</button>
        <div className="movies-card__container">
          <h1 className="movies-card__title">33 слова о дизайне</h1>
          <p className="movies-card__time">1ч 17м</p>
        </div>
      </li>
    </>
  )
}
