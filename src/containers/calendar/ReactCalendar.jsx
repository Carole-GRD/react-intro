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


// ////////////////////////////////////////////

// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'

// const localizer = momentLocalizer(moment)

// const ReactCalendar = (props) => (
//     <div>
//         <Calendar
//             localizer={localizer}
//             //events={myEventsList}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ height: 500 }}
//         />
//     </div>
// )

// export default ReactCalendar