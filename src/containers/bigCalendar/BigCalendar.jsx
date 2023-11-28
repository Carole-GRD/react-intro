import { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import "react-datepicker/dist/react-datepicker.css";
import './bigCalendar.css'
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

const LSKEY = "MyTodoApp";

function BigCalendar(props) {

    
    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
    // const [allEvents, setAllEvents] = useState(myEventsList)
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [updatedEvent, setUpdatedEvent] = useState(null);

    const [allEvents, setAllEvents] = useState(() => {
        const storedEvents = JSON.parse(
            window.localStorage.getItem(LSKEY + ".events")
        );
        console.log('myEventsList', myEventsList);
        console.log('storedEvents', storedEvents);
        return (storedEvents == null || storedEvents.length === 0) ? myEventsList : storedEvents;
    });

    // const [allEvents, setAllEvents] = useState([]);
    // localStorage.clear();

    // TODO : n'enregistrer dans le localStorage que lorsqu'on quitte la page
    useEffect(() => {
        // Sauvegarder les todos dans le localStorage à chaque changement
        window.localStorage.setItem(LSKEY + ".events", JSON.stringify(allEvents));
        console.log(allEvents);
    }, [allEvents])



    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
    }


    // ---------------------------------------------
    function handleDeleteEvent(eventTitle) {
        const updatedEvents = allEvents.filter(event => event.title !== eventTitle);
        setAllEvents(updatedEvents);
    }
    function handleUpdateEvent(eventToUpdate) {
        console.log('event to update : ', eventToUpdate);
        setUpdatedEvent(eventToUpdate);
        // TODO : lancer la fonction handleAddEvent mais la modifier
        // il faut vérifier si c'est un nouveau event ou si on modifie l'event !!!
        // TODO : trouver l'index de l'event à modifier et le modifier
        // const updatedEvents = allEvents.filter(event => event.title !== eventTitle);
        // setAllEvents(updatedEvents);
    }
    function handleCancelEvent() {
        setSelectedEvent(null);
        setUpdatedEvent(null);
    }

    // ---------------------------------------------

    return (
        <div className='big-calendar-container'>
            <h2>{updatedEvent ? 'Update' : 'Add New'} Event</h2>
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
            
            {/* ---------------------------------- */}
            {selectedEvent && (
                <div className='selected-event'>
                    <span>{selectedEvent.title}</span>
                    <button onClick={() => handleUpdateEvent(selectedEvent)}>Update</button>
                    <button onClick={() => handleDeleteEvent(selectedEvent.title)}>Delete</button>
                    <button onClick={handleCancelEvent}>Cancel</button>
                </div>
            )}
            {/* ---------------------------------- */}
            
            
            <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                className='big-calendar'
                eventPropGetter={(event) => ({ style: { backgroundColor: '#3498db' } })}
                onSelectEvent={(event) => setSelectedEvent(event)}
            />
        </div>
    )
}

export default BigCalendar