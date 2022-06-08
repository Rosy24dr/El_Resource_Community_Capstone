import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const EventCalendar = (props) => {
    
const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
  
    {
        title: "Food Bank",
        start: new Date(2022,5, 1),
        end: new Date(2022, 5, 4),
    },

    {
        title: "Food Bank",
        start: new Date(2022,5, 6),
        end: new Date(2022, 5, 11),
    },
    
    {
        title: "Soup Kitchen",
        start: new Date(2022, 5, 7),
        end: new Date(2022, 6, 1),
    },

    {
        title: "Food Bank",
        start: new Date(2022,5, 13),
        end: new Date(2022, 5, 18),
    },

    {
        title: "Food Bank",
        start: new Date(2022,5, 20),
        end: new Date(2022, 5, 25),
    },

    {
        title: "Food Bank",
        start: new Date(2022,5, 27),
        end: new Date(2022, 6, 11),
    },

    


    
];


    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);}


    return (
        <div>
            <div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 450, margin: "50px" , width: "70%", marginLeft: "15%", marginTop:"2%"}} />
        </div>

        </div>

    )}

    export default EventCalendar;