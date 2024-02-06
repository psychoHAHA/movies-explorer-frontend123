import React, { useState } from "react"
import { Link, useLocation, NavLink } from "react-router-dom"

import "./HeaderAuth.css"

export default function HeaderAuth() {
  const location = useLocation()
  const [ isOpen, setIsOpen] = useState()

  return (
    <>
      <ul className={`header__navbar ${isOpen ? "header__navbar--active" : ""}`} >
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
          <NavLink to="/saved-movies" className="header__navbar-item_type_link">
            Сохраненные фильмы
          </NavLink>
        </li>
      </ul>
      <Link to="/profile">
        <button className="header__button header__button-profile" type="button">
          Аккаунт
        </button>
      </Link>

      <button className={`header__burger ${isOpen ? "header__burger--active" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        <span className="header__burger-line "></span>
        <span className="header__burger-line"></span>
        <span className="header__burger-line"></span>
      </button>
    </>
  )
}
