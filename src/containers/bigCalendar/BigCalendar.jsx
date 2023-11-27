import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import "react-datepicker/dist/react-datepicker.css";
import './bigCalendar.css'
import { useState } from 'react'
import DatePicker from 'react-datepicker'

const locales = {
    'en-US': enUS,
}

const myEventsList = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2023,10,23),
        end: new Date(2023,10,23)
    },
    {
        title: "Vacation",
        start: new Date(2023,10,23),
        end: new Date(2023,11,1)
    },
    {
        title: "Conference",
        start: new Date(2023,10,23),
        end: new Date(2023,10,25)
    }
]

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

function BigCalendar(props) {

    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
    const [allEvents, setAllEvents] = useState(myEventsList)

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent])
    }

    return (
        <div className='big-calendar-container'>
            <h2>Add New Event</h2>
            <div className='add-event'>
                <input 
                    type="text" 
                    placeholder="Add Title" 
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
                <DatePicker 
                    className="date-picker"
                    placeholderText="Start Date"
                    selected={newEvent.start}
                    onChange={(start) => setNewEvent({...newEvent, start})}
                />
                <DatePicker 
                    className="date-picker"
                    placeholderText="End Date"
                    selected={newEvent.end}
                    onChange={(end) => setNewEvent({...newEvent, end})}
                />
                <button onClick={handleAddEvent} className='add-event-btn'>
                    Add Event
                </button>
            </div>
            <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                // style={{ height: 650 }}
                className='big-calendar'
            />
        </div>
    )
}

export default BigCalendar