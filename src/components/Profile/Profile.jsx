import "./Profile.css"
import Header from "../Header/Header"

export default function Profile() {
  return (
    <>
      <Header />
      <div className="profile">
        <h1 className="profile__title">Привет, Кирилл!</h1>
        <form className="profile__form">
          <div className="profile__list">
            <label className="profile__label">Имя</label>
            <input type="text" className="profile__input" />
          </div>
          <div className="profile__list">
            <label className="profile__label">E-mail</label>
            <input type="text" className="profile__input" />
          </div>
        </form>

        <div className="profile__buttons">
            <button className="profile__button profile__button-edit">Редактировать</button>
            <button className="profile__button profile__button-logout">
              Выйти из аккаунта
            </button>
          </div>
      </div>
    </>
  )
}
