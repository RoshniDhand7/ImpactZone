import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import { useState } from "react";

const AccessCalendar = () => {
  const calendarRef = useRef(null);

  const handleDateSelect = (selectInfo) => {
    console.log(moment().day(selectInfo.start.getDay()));
    if (selectInfo.view.type === "timeGridWeek") {
      selectInfo.view.calendar.unselect();

      const newEvent = {
        // id: nanoid(),
        // title,
        start: selectInfo.start.toISOString(),
        end: selectInfo.end.toISOString(),
        // allDay: state.selectInfo?.allDay || false
      };

      let calendarApi = calendarRef.current.getApi();
      // let calendarApi = selectInfo.view.calendar

      getSchedule(newEvent);
      calendarApi.addEvent(newEvent);
    }
  };

  const getSchedule = (event) => {
    console.group(event);
  };

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      views={{
        timeGridWeek: {
          type: "timeGrid",
          dayHeaderFormat: { weekday: "long" },
        },
      }}
      headerToolbar=""
      selectable={true}
      editable={true}
      select={handleDateSelect}
    />
  );
};

export default AccessCalendar;
