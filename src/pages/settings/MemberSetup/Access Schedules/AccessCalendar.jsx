import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useState } from "react";

const AccessCalendar = () => {
  const calendarRef = useRef(null);

  const handleDateSelect = (selectInfo) => {
    // console.log(selectInfo.view.type);
    if (selectInfo.view.type === "timeGridWeek") {
      selectInfo.view.calendar.unselect();

      const newEvent = {
        // id: nanoid(),
        // title,
        start: selectInfo.start.toISOString(),
        end: selectInfo.end.toISOString(),
        // allDay: state.selectInfo?.allDay || false
      };
      // console.log(newEvent);

      let calendarApi = calendarRef.current.getApi();
      // let calendarApi = selectInfo.view.calendar

      calendarApi.addEvent(newEvent);
    }
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
