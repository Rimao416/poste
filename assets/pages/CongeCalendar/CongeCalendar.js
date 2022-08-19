import "./congecalendar.css";
import React, { useState } from "react";
import Title from "../../Components/title/Title";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2021, 6, 0),
    end: new Date(2021, 6, 0),
  },
  {
    title: "Vacation",
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
  },
  {
    title: "Conference",
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
  },
];
export default function CongeCalendar() {
  const [allEvents, setAllEvents] = useState(events);
  return (
    <div className="congeCalendar d-flex-4">
      <div className="centre">
        <Title nomdepage="Dashboard" subname="Calendrier des congés"></Title>
        <div className="calendar">
            <h1>Bonjour à tous</h1>
          <Calendar
            localizer={localizer}
            events={allEvents}
            startAccessor="start"
            endAccessor="end"
          />
        </div>
      </div>
    </div>
  );
}
