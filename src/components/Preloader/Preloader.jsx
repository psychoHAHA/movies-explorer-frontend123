import React from 'react'
import './Preloader.css'

export default function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <span className="preloader__indicator"></span>
      </div>
    </div>
  )
}
