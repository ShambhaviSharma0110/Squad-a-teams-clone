import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {Link} from 'react-router-dom';
import "./Calendar.scss";


export default class Calendar extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    calendarWeekends: true,
    calendarEvents: [
      // initial event data
      { title: "Current event", start: new Date() },
    ],
  };

  render() {
    return (
      <div className="calendar-wrap">
        <div className="header">
          <button onClick={this.toggleWeekends} className="btn-l">
            Exclude weekends
          </button>
          &nbsp;
          <button onClick={this.gotoPast} className="btn-r">
            Dive in the past
          </button>
          <Link to = '/'>
            <button className="btn-c">Head back to home</button>
          </Link>
          &nbsp; To add an event click on the date and time
        </div>
        <div className="calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
          />
        </div>
      </div>
    );
  }

  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends,
    });
  };

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2011-01-01"); // call a method on the Calendar object
  };

  handleDateClick = (arg) => {
    if (
      window.confirm(
        "Want to add an event " + arg.dateStr + " ?"
      )
    ) {
      this.setState({
        // add new event data
        calendarEvents: this.state.calendarEvents.concat({
          // creates a new array
          title: "Input Event",
          start: arg.date,
          allDay: arg.allDay,
        }),
      });
    }
  };
}
