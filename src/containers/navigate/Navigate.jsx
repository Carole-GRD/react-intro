import { NavLink } from 'react-router-dom'

import './navigate.css'

function Navigate() {
    return (
        <div className='navigate'>
            <ul>
                <li>
                    {/* <NavLink to="/" className="nav-link"> */}
                    <NavLink to="/" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>
                        Todo List
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink to="/calendar" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>
                        Calendar
                    </NavLink>
                </li> */}
                <li>
                    {/* <NavLink to="/big-calendar" className="nav-link"> */}
                    <NavLink to="/big-calendar" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>
                        Big Calendar
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Navigate
