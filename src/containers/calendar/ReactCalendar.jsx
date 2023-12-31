import { useState } from 'react'

import Calendar from 'react-calendar'

import 'react-calendar/dist/Calendar.css'
// import './calendar.css'

function ReactCalendar() {
    const [value, onChange] = useState(new Date());

    return (
        <div className='calendar'>
            <Calendar 
                onChange={onChange} 
                value={value} 
            />
        </div>
    );
}

export default ReactCalendar

