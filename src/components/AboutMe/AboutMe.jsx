import "./AboutMe.css"
import photo from "../../images/me.jpg"


export default function AboutMe() {
  return (
    <>
      <div className="about-me">
        <h2 className="about-me__title">Студент</h2>
        <img src={photo} alt="я" className="about-me__photo" />
        <h3 className="about-me__name">Кирилл</h3>
        <p className="about-me__profession">Фронтенд-разработчик, 19 лет</p>
        <p className="about-me__info">
          Я родился и живу в Екатеринбурге, учусь на строительном факультете. В
          свободное время читаю книги, смотрю фильмы, играю в видеоигры, играю в
          футбол. Недавно начал кодить. С апреля 2023 года прохожу курс по
          веб-разработке, сейчас пишу диплом.
        </p>
        <div className="about-me__links">
          <a href="https://github.com/psychoHAHA" className="about-me__link">
            Github
          </a>
          <a href="https://t.me/kirillzernov" className="about-me__link">
            Telegram
          </a>
          <a href="https://vk.com/id326948405" className="about-me__link">
            vk
          </a>
        </div>
      </div>
    </>
  )
}
