<<<<<<< HEAD
import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../Auth/Auth.css"
import logo from "../../images/logo.svg"

export default function Login({ onLogin }) {
  // const location = useLocation()
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  // const navigate = useNavigate()

  // const handleSubmit = (evt) => {
  //   evt.preventDefault()
  //   onLogin({ email, password }).then(() => {
  //     navigate('/movies')
  //   }).catch((error) => console.log(error))
  // }

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormValue({
      ...formValue,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = formValue
    onLogin(email, password)
  }
=======
import React from "react"
import { Link, useLocation } from "react-router-dom"
import "../Auth/Auth.css"
import logo from "../../images/logo.svg"

export default function Login() {
  const location = useLocation()
>>>>>>> main

  return (
    <div className="auth">
      <Link to="/" className="auth__link">
        <img src={logo} alt="logo" className="auth__logo"></img>
      </Link>

      <h1 className="auth__title">Рады видеть!</h1>

<<<<<<< HEAD
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__inputs">
          <label className="auth__label">E-mail</label>
          <input type="email" name="email" className="auth__input" value={formValue.email} onChange={handleChange} required />
        </div>
        <div className="auth__inputs">
          <label className="auth__label">Пароль</label>
          <input type="password" name="password" className="auth__input" value={formValue.password} onChange={handleChange} required />
        </div>
        <button className="auth__button" type="submit">Войти</button>
      </form>
=======
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
      <button className="auth__button" type="submit">Войти</button>
>>>>>>> main
        <p className="auth__text">
        Ещё не зарегистрированы?
        <a href="/signup" className="auth__link" >Регистрация</a>
        </p>
    </div>
  )
}
