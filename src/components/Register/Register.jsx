import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../Auth/Auth.css"
import logo from "../../images/logo.svg"

import * as mainApi from "../../utils/MainApi.js"

export default function Register() {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  })

  const location = useLocation()
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormValue({
      ...formValue,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    mainApi
      .register(formValue.name, formValue.email, formValue.password)
      .then(() => {
        navigate("/signin", { replace: true })
      })
  }

  return (
    <div className="auth">
      <Link to="/" className="auth__link">
        <img src={logo} alt="logo" className="auth__logo"></img>
      </Link>

      <h1 className="auth__title">Добро пожаловать!</h1>

      <form onSubmit={handleSubmit} className="auth__form">
        <div className="auth__inputs">
          <label className="auth__label" htmlFor="name">
            Имя
          </label>
          <input type="name" name="name" className="auth__input" value={formValue.name} onChange={handleChange} required />
        </div>
        <div className="auth__inputs">
          <label className="auth__label" htmlFor="email">
            E-mail
          </label>
          <input type="email" name="email" className="auth__input" value={formValue.email} onChange={handleChange} required />
        </div>
        <div className="auth__inputs">
          <label className="auth__label" htmlFor="password">
            Пароль
          </label>
          <input
            type="password"
            name="password"
            className="auth__input"
            value={formValue.password}
            onChange={handleChange}
            required
          />
        </div>
      </form>
      <button type="submit" onSubmit={handleSubmit} className="auth__button" >
        Зарегистроваться
      </button>
      <p className="auth__text">
        Уже зарегистрированы?
        <a href="/signin" className="auth__link">
          Войти
        </a>
      </p>
    </div>
  )
}
