import { Link } from "react-router-dom"
import '../styles/header.css'


export const HeaderComponent = () => {
  return (
    <section className="container-header">
    <header className="header">
        <h3>SDfit</h3>

        <ul className="container-list">
            <li className="item-home">
                <Link to = '/' >Home</Link>
            </li>
            <li className="item-workout">
                <Link to = '/Workout'>Workout</Link>
            </li>
            <li className="item-nutrition">
                <Link to = '/Nutrition'>Nutrition</Link>
            </li>
            <li className="item-statistics">
                <Link to = '/Statistics'>Statistics</Link>
            </li>
        </ul>
    </header>
    </section>
  )
}
