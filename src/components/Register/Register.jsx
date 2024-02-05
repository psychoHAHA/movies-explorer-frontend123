import React from "react"
import { Link, useLocation } from "react-router-dom"
import "../Auth/Auth.css"
import logo from "../../images/logo.svg"

export default function Register() {
  const location = useLocation()

  return (
    <div className="auth">
      <Link to="/" className="auth__link">
        <img src={logo} alt="logo" className="auth__logo"></img>
      </Link>

      <h1 className="auth__title">Добро пожаловать!</h1>

      <form className="auth__form">
        <div className="auth__inputs">
          <label className="auth__label">Имя</label>
          <input type="name" name="name" className="auth__input" />
        </div>
        <div className="auth__inputs">
          <label className="auth__label">E-mail</label>
          <input type="email" name="name" className="auth__input" />
        </div>
        <div className="auth__inputs">
          <label className="auth__label">Пароль</label>
          <input type="password" name="name" className="auth__input" />
        </div>
      </form>
      <button className="auth__button">Зарегистроваться</button>
        <p className="auth__text">
        Уже зарегистрированы?
        <a href="/signin" className="auth__link" >Войти</a>
        </p>
    </div>
  )
}
