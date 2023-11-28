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



function BigCalendar() {

    const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [allEvents, setAllEvents] = useState(() => {
        const storedEvents = JSON.parse(
            window.localStorage.getItem(LSKEY + ".events")
        );
        return (storedEvents == null || storedEvents.length === 0) ? myEventsList : storedEvents;
    });

    // const [allEvents, setAllEvents] = useState([]);
    // localStorage.clear();

    // TODO : n'enregistrer dans le localStorage que lorsqu'on quitte la page
    useEffect(() => {
        window.localStorage.setItem(LSKEY + ".events", JSON.stringify(allEvents));
    }, [allEvents])


    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
        setNewEvent({ title: "", start: "", end: "" });
    }


    function handleDeleteEvent(eventTitle) {
        const deletedEvents = allEvents.filter(event => event.title !== eventTitle);
        setAllEvents(deletedEvents);
        setSelectedEvent(null);
    }

    function handleUpdateEvent(eventToUpdate) {
        
        const updatedEvent = allEvents.find(event => event.title === eventToUpdate.title);

        if (updatedEvent) {
            // si les champs sont vides, garde les valeurs avant modification
            if (newEvent.title === '') {
                newEvent.title = eventToUpdate.title;
            }
            if (newEvent.start === '') {
                newEvent.start = eventToUpdate.start;
            }
            if (newEvent.end === '') {
                newEvent.end = eventToUpdate.end;
            }
            // trouve l'index de l'event dans la liste
            const index = allEvents.indexOf(updatedEvent);
            // fais une copie 
            const newEvents = [...allEvents];
            // modifie l'event de la copie
            newEvents.splice(index, 1, newEvent);
            // réactualise l'état de la liste todos
            setAllEvents(newEvents);
        }
        setNewEvent({ title: "", start: "", end: "" });
        setSelectedEvent(null);
    }

    // annule la sélection de l'event (si l'utilisateur ne veut pas le modifier, ni le supprimer)
    function handleCancelEvent() {
        setSelectedEvent(null);
    }


    return (
        <div className='big-calendar-container'>
            <h2>{selectedEvent ? selectedEvent.title : 'Add New Event'}</h2>
            <div className='add-event'>
                <input 
                    type="text" 
                    placeholder={selectedEvent ? selectedEvent.title : "Add Title"}
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
                <DatePicker 
                    className="date-picker"
                    placeholderText={selectedEvent 
                        ? `${new Date(selectedEvent.start).getDate()}/${new Date(selectedEvent.start).getMonth() + 1}/${new Date(selectedEvent.start).getFullYear()}` 
                        : "Start Date"}
                    selected={newEvent.start}
                    onChange={(start) => setNewEvent({...newEvent, start})}
                />
                <DatePicker 
                    className="date-picker"
                    placeholderText={selectedEvent 
                        ? `${new Date(selectedEvent.end).getDate()}/${new Date(selectedEvent.end).getMonth() + 1}/${new Date(selectedEvent.end).getFullYear()}` 
                        : "End Date"}
                    selected={newEvent.end}
                    onChange={(end) => setNewEvent({...newEvent, end})}
                />
                {!selectedEvent ? (
                    <button onClick={handleAddEvent} className='add-event-btn'>
                        Add Event
                    </button>
                ) : (
                    <div className='selected-event'>
                        <button onClick={() => handleUpdateEvent(selectedEvent)}>Update</button>
                        <button onClick={() => handleDeleteEvent(selectedEvent.title)}>Delete</button>
                        <button onClick={handleCancelEvent}>Cancel</button>
                    </div>
                )}
            </div>
            
            
            <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                className='big-calendar'
                eventPropGetter={() => ({ style: { backgroundColor: '#3498db' } })}
                onSelectEvent={(event) => setSelectedEvent(event)}
            />
        </div>
    )
}

export default BigCalendar