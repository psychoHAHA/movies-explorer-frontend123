import './SearchForm.css'

import { useForm } from 'react-hook-form'

import { validationOptions } from './../../constants/validationOptions'
import MyInput from '../ui/MyInput/MyInput'
import MyButton from '../ui/MyButton/MyButton'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

const { movieSearchValidOptions } = validationOptions

export default function SearchForm({
  onSearchFormSubmit,
  onIsShortChangeHandler,
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
          <MyInput
            register={register}
            registerOptions={movieSearchValidOptions}
            name="search"
            type="search"
            className="search-form__input"
            placeholder="Фильм"
          />
          <MyButton />
        </form>

        <FilterCheckbox
          name={'isShort'}
          register={register}
          onCheckboxChange={onIsShortChangeHandler}
        />
      </section>
    </>
  )
}
