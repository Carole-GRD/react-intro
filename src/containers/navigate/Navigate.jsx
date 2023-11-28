import { Link } from 'react-router-dom'

import './navigate.css'

function Navigate() {
    return (
        <div className='navigate'>
            <ul>
                <li>
                    <Link to="/" className="nav-link">
                        Todo List
                    </Link>
                </li>
                {/* <li>
                    <Link to="/calendar" className="nav-link">
                        Calendar
                    </Link>
                </li> */}
                <li>
                    <Link to="/big-calendar" className="nav-link">
                        Big Calendar
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navigate
