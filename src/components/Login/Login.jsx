import React from "react"
import { Link, useLocation } from "react-router-dom"
import "../Auth/Auth.css"
import logo from "../../images/logo.svg"

export default function Login() {
  const location = useLocation()

  return (
    <div className="auth">
      <Link to="/" className="auth__link">
        <img src={logo} alt="logo" className="auth__logo"></img>
      </Link>

      <h1 className="auth__title">Рады видеть!</h1>

      <form className="auth__form">
        <div className="auth__inputs">
          <label className="auth__label">E-mail</label>
          <input type="email" name="name" className="auth__input" required />
        </div>
        <div className="auth__inputs">
          <label className="auth__label">Пароль</label>
          <input type="password" name="name" className="auth__input" required />
        </div>
      </form>
      <button className="auth__button">Войти</button>
        <p className="auth__text">
        Ещё не зарегистрированы?
        <a href="/signin" className="auth__link" >Регистрация</a>
        </p>
    </div>
  )
}
