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
      </section>
    </>
  )
}
