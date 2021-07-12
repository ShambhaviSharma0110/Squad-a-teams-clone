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
          {/* clicking on this button wil remove saturdays and sundays*/}
          <button onClick={this.HideWeekends} className="btn-l">
            Exclude weekends
          </button>
          &nbsp;
          {/* clicking on this button will take you to January 2011 as set*/}
          <button onClick={this.diveInPast} className="btn-r">
            Dive in the past
          </button>
          {/* Link to head back home*/}
          <Link to="/">
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
//function to hide and show weekends
  HideWeekends = () => {
    this.setState({
      // updating property
      calendarWeekends: !this.state.calendarWeekends,
    });
  };
//function to go to a past date as set here jan 2011
  diveInPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2011-01-01"); // calling a method on Calendar object
  };
//alert to confirm adding event on calendar
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
          title: "Meeting",
          start: arg.date,
          allDay: arg.allDay,
        }),
      });
    }
  };
}
