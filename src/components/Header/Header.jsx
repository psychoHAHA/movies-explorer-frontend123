import React from "react"
import { Link, useLocation, NavLink } from "react-router-dom"

import "./Header.css"
import logo from "../../images/logo.svg"

export default function Header() {
  const location = useLocation()

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} alt="logo" className="header__logo"></img>
      </Link>

      {/* <ul className="header__navbar">
        <li className="header__navbar-item">
          <NavLink to="/" className="header__navbar-item_type_link">
            Главная
          </NavLink>
        </li>
        <li className="header__navbar-item">
          <NavLink to="/movies" className="header__navbar-item_type_link">
            Фильмы
          </NavLink>
        </li>
        <li className="header__navbar-item">
          <NavLink to="/movies" className="header__navbar-item_type_link">
            Сохраненные фильмы
          </NavLink>
        </li>
      </ul> */}

      <div className="header__account-menu">
        <Link to="/singup">
          <button
            className="header__button header__button-signup"
            type="button"
          >
            Регистрация
          </button>
        </Link>

        <Link to="/signin">
          <button
            className="header__button header__button-signin"
            type="button"
          >
            Войти
          </button>
        </Link>
      </div>

      {/* <Link to="profile" className="header__link-profile">
        Аккаунт
      </Link> */}

      {/* <div className="header__burger">
        <span className="header__burger-container"></span>
      </div> */}
    </header>
  )
}
