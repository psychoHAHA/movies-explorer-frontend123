import "./Portfolio.css"
import linkImage from "../../images/linkImage.svg"

export default function Portfolio() {
  return (
    <>
      <div className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
        <ul className="portfolio__links">
          <li className="portfolio__links-type_item">
            <a href="" className="portfolio__link">
              Статичный сайт
              <img
                src={linkImage}
                alt=""
                className="portfolio__link-image"
              />
            </a>
          </li>
          <li className="portfolio__links-type_item">
            <a href="" className="portfolio__link">
              Адаптивный сайт
              <img
                src={linkImage}
                alt=""
                className="portfolio__link-image"
              />
            </a>
          </li>
          <li className="portfolio__links-type_item">
            <a href="" className="portfolio__link">
              Одностраничное приложение
              <img
                src={linkImage}
                alt=""
                className="portfolio__link-image"
              />
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}