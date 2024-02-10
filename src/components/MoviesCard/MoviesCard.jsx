import "./MoviesCard.css"
import movie1 from "../../images/movie1.png"
import movie2 from "../../images/movie2.png"
import movie3 from "../../images/movie3.png"

export default function MoviesCard() {
  return (
    <>
      <li className="movies-card">
        <a
          href="https://ru.stackoverflow.com/questions/794414/%D0%9A%D0%BD%D0%BE%D0%BF%D0%BA%D0%B0-%D0%BF%D0%BE%D0%B2%D0%B5%D1%80%D1%85-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B8"
          className="movies-card__link"
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
        <button className="movies-card__button">Сохранить</button>
        <div className="movies-card__container">
          <h1 className="movies-card__title">В погоне за Бенкси</h1>
          <p className="movies-card__time">1ч 17м</p>
        </div>
      </li>

      <li className="movies-card">
        <a href="#" className="movies-card__link">
          <img src={movie3} alt="обложка кина" className="movies-card__image" />
        </a>
        <button className="movies-card__button">Сохранить</button>
        <div className="movies-card__container">
          <h1 className="movies-card__title">33 слова о дизайне</h1>
          <p className="movies-card__time">1ч 17м</p>
        </div>
      </li>

      <li className="movies-card">
        <a
          href="https://ru.stackoverflow.com/questions/794414/%D0%9A%D0%BD%D0%BE%D0%BF%D0%BA%D0%B0-%D0%BF%D0%BE%D0%B2%D0%B5%D1%80%D1%85-%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B8"
          className="movies-card__link"
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
        <button className="movies-card__button">Сохранить</button>
        <div className="movies-card__container">
          <h1 className="movies-card__title">В погоне за Бенкси</h1>
          <p className="movies-card__time">1ч 17м</p>
        </div>
      </li>

      <li className="movies-card">
        <a href="#" className="movies-card__link">
          <img src={movie3} alt="обложка кина" className="movies-card__image" />
        </a>
        <button className="movies-card__button">Сохранить</button>
        <div className="movies-card__container">
          <h1 className="movies-card__title">33 слова о дизайне</h1>
          <p className="movies-card__time">1ч 17м</p>
        </div>
      </li>
    </>
  )
}
