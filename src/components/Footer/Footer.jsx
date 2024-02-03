import "./Footer.css"

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="footer__info">
          <p className="footer__time">©2024</p>
          <div className="footer__links">
            <a href="" className="footer__link">Яндекс.Практикум</a>
            <a href="" className="footer__link">Github</a>
          </div>
        </div>
      </footer>
    </>
  )
}