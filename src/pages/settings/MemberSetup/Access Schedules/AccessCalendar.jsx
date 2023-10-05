import React from "react";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/react";
import { useState } from "react";

const AccessCalendar = () => {
  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      views={{
        timeGridWeek: {
          type: "timeGrid",
          dayHeaderFormat: { weekday: "long" },
        },
      }}
    />
  );
};

export default AccessCalendar;
