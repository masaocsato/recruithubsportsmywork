import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { getEventById } from "./ProfileServer";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

// function handleDoubleClickEvent(event) {
//   getEventById(event.id).then(response => {
//     console.log("GET", response);
//     let eventData = {
//       name: response.data.item.name,
//       shortName: response.data.item.shortName,
//       eventTypeId: response.data.item.eventTypeId,
//       startDate: response.data.item.startDate,
//       endDate: response.data.item.endDate,
//       description: response.data.item.description,
//       websiteUrl: response.data.item.websiteUrl,
//       logo: response.data.item.logo,
//       isOngoing: response.data.item.isOngoing,
//       organizer: response.data.item.organizer,
//       street: response.data.item.street,
//       suite: response.data.item.suite,
//       city: response.data.item.city,
//       state: response.data.item.state,
//       zip: response.data.item.zip,
//       lat: response.data.item.lat,
//       long: response.data.item.long
//     };
//   });
// }

function Event({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ":  " + event.desc}
    </span>
  );
}

function EventAgenda({ event }) {
  return (
    <span>
      <em style={{ color: "magenta" }}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  );
}

const ProfileCalendar = props => {
  return (
    <div className="app-calendar animated slideInUpTiny animation-duration-3">
      <BigCalendar
        events={props.events}
        defaultDate={new Date(Date.now())}
        defaultView="month"
        drilldownView="day"
        //onDoubleClickEvent={props.handleDoubleClickEvent}
        onSelectEvent={props.handleDoubleClickEvent}
        //eventData={eventData ? eventData : ""}
        components={{
          event: Event,
          agenda: {
            event: EventAgenda
          }
        }}
      />
    </div>
  );
};

export default ProfileCalendar;
