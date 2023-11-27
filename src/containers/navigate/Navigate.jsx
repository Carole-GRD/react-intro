import { Link } from 'react-router-dom'

import './navigate.css'

function Navigate() {
    return (
        <div className='navigate'>
            <ul>
                <li>
                    <Link to="/">
                        Todo List
                    </Link>
                </li>
                <li>
                    <Link to="/calendar">
                        Calendar
                    </Link>
                </li>
                <li>
                    <Link to="/big-calendar">
                        Big Calendar
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navigate
