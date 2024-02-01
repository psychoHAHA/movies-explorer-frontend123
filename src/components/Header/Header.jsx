import React from "react"
import { Link, useLocation, NavLink } from "react-router-dom"

export default function Header() {
  const location = useLocation()

  return (
    <header className="header">
      <Link to="." className="header__link">
        <img
          src="../images/logo"
          alt="logo"
          className="header__logo"
        ></img>
      </Link>

      <ul className="header__navbar">
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
      </ul>

      <Link to="profile" className="header__link-profile">
        Аккаунт
      </Link>
    </header>
  )
}
