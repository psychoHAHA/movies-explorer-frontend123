import './MyButton.css'

export default function MyButton({ ...props }) {
  return <button className="button" {...props}></button>
}
