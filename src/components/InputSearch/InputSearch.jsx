import './InputSearch.css'
import React from 'react'

export default function InputSearch({
  register,
  name,
  registerOptions,
  ...props
}) {
  return (
    <input
      {...register(name, registerOptions)}
      className="search__input"
      {...props}
    />
  )
}
