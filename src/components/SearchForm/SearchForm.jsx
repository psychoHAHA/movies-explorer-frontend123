<<<<<<< HEAD
import './SearchForm.css'

import React from 'react'

import { useForm } from 'react-hook-form'

import InputSearch from '../InputSearch/InputSearch'
import ButtonSearch from '../ButtonSearch/ButtonSearch'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

export default function SearchForm({
  onSearchFormSubmit,
  onHandleShortChange,
  moviesFilter,
}) {

  const methods = useForm({
    defaultValues: {
      search: moviesFilter.query,
      isShort: moviesFilter.isShort,
    },
    value: { search: moviesFilter.query, isShort: moviesFilter.isShort },
    mode: 'onSubmit',
  })

  const {
    handleSubmit,
    register,
  } = methods

  return (
    <>
      <section className="search-form">
        <form className="search-form__form" onSubmit={handleSubmit(onSearchFormSubmit)}>
          <InputSearch
            register={register}
            name="search"
            type="search"
            className="search-form__input"
            placeholder="Фильм"
          />
          <ButtonSearch />
        </form>

        <FilterCheckbox
          name={'isShort'}
          register={register}
          onCheckboxChange={onHandleShortChange}
        />
=======
import "./SearchForm.css"

export default function SearchForm() {
  return (
    <>
      <section className="search-form">
        <form className="search-form__form">
          <input
            className="search-form__input"
            type="search"
            placeholder="Фильмы"
            required
          />
          <button className="search-form__button" type="submit"></button>
        </form>

        <div className="search-form__container">
          <label className="search-form__checkboxs" htmlFor="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              className="search-form__checkbox"
            />
            <span className="auth__input-error"></span>
            <span className="search-form__span">Короткометражки</span>
          </label>
        </div>
>>>>>>> main
      </section>
    </>
  )
}
