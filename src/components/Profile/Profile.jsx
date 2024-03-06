import './Profile.css'
import Header from '../Header/Header'

import { useContext, useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'

import { CurrentUserContext } from './../../contexts/CurrentUserContext'

// import { validationOptions } from '../../constants/validationOptions.js'
// import { apiErrorMessages } from './../../constants/constants.js'
import mainApi from '../../utils/MainApi.js'

// const { nameValidOptions, emailValidOptions } = validationOptions

export default function Profile({
  onLogout,
  // onEditUserInfo,
  // isApiError,
  // setIsApiError,
}) {
  const { currentUser } = useContext(CurrentUserContext)

  // const methods = useForm({
  //   values: { name: currentUser.name, email: currentUser.email },
  //   mode: 'onChange',
  // })
  // const {
  //   handleSubmit,
  //   register,
  // } = methods

  // const [editUserInfo, setEditUserInfo] = useState(false)
  // const [apiErrorMessage, setApiErrorMessage] = useState(
  //   apiErrorMessages.userEditError
  // )

  // useEffect(() => {
  //   if (editUserInfo) {
  //     const formInputs = document.querySelectorAll('input')
  //     formInputs[0].focus()
  //   }
  // }, [editUserInfo, isApiError])

  // const getErrorMessage = (err) => {
  //   if (err.message === 'Validation failed') {
  //     return `Не корректно введено значение ${err.validation.body.keys.join(
  //       ', '
  //     )}`
  //   } else if (err.message) {
  //     return err.message
  //   } else {
  //     return apiErrorMessages.userEditError
  //   }
  // }

  // const editUserInfoHandler = (evt) => {
  //   evt.preventDefault()
  //   setIsApiError(false)
  //   setEditUserInfo(true)
  //   console.log(123);
  // }

  // const formSubmitHandler = (data) => {
  //   onEditUserInfo(data)
  //     .then(() => {
  //       setEditUserInfo(false)
  //       console.log(555);
  //     })
  //     .catch((err) => {
  //       setIsApiError(true)
  //       const message = getErrorMessage(err)
  //       setApiErrorMessage(message)
  //     })
  //     .finally(() => {
  //       setIsApiError(true)
  //     })
  // }

  const [name, setName] = useState(currentUser.name)
  const [editName, setEditName] = useState(currentUser.name)
  const [email, setEmail] = useState(currentUser.email)
  const [editEmail, setEditEmail] = useState(currentUser.email)

  const handleSubmit = (evt) => {
    evt.preventDefault()

    mainApi
      .setUserInfo({ name, email })
      .then(() => {
        setEditName(name)
        setEditEmail(email)
      })
      .catch((error) => console.log(error))
  }

  const handleNameChange = (evt) => {
    const value = evt.target.value
    setName(value)
  }

  const handleEmailChange = (evt) => {
    const value = evt.target.value
    setEmail(value)
  }

  const logoutClickHandler = (evt) => {
    evt.preventDefault()
    onLogout()
  }

  return (
    <>
      <Header />
      <div className="profile">
        <h1 className="profile__title">Привет, {name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__list">
            <label className="profile__label" htmlFor="name">
              Имя
            </label>
            <input
              id="name"
              type="text"
              className="profile__input"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="profile__list">
            <label className="profile__label">E-mail</label>
            <input
              type="email"
              className="profile__input"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="profile__buttons">
            <button
              className="profile__button profile__button-edit"
            >
              Редактировать
            </button>
            <button
              className="profile__button profile__button-logout"
              onClick={logoutClickHandler}
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
