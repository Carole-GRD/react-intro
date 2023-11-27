import { NavLink } from 'react-router-dom'

import './navigate.css'

function Navigate() {
    return (
        <div className='navigate'>
            <ul>
                <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                            isPending ? "pending" : "",
                            isActive ? "active" : "",
                            isTransitioning ? "transitioning" : "",
                            ].join(" ")
                        }>
                        Todo List
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/calendar"
                        className={({ isActive, isPending, isTransitioning }) =>
                            [
                            isPending ? "pending" : "",
                            isActive ? "active" : "",
                            isTransitioning ? "transitioning" : "",
                            ].join(" ")
                        }>
                        Calendar
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Navigate
