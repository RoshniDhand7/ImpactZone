import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import constants from "../../../../utils/constants";
import { Menu } from "primereact/menu";

const AccessCalendar = ({
  accessSchedulesForm,
  setAccessSchedulesForm,
  duration,
}) => {
  const calendarRef = useRef(null);
  const menuDelete = useRef(null);

  const handleDateSelect = (selectInfo) => {
    if (selectInfo.view.type === "timeGridWeek") {
      selectInfo.view.calendar.unselect();

      const dayName = moment(selectInfo.start).format("dddd");
      const dayShortName = moment(selectInfo.start)
        .format("dddd")
        .substring(0, 3);

      const newEvent = {
        start: selectInfo.start.toISOString(),
        end: selectInfo.end.toISOString(),
      };

      let calendarApi = calendarRef.current.getApi();

      getSchedule(newEvent, dayName, dayShortName);
      calendarApi.addEvent(newEvent);
    }
  };

  const getSchedule = (event, dayName, shortName) => {
    setAccessSchedulesForm({
      ...accessSchedulesForm,
      schedule: [
        ...accessSchedulesForm.schedule,
        {
          day: dayName,
          shortName: shortName,
          startTime: event.start,
          endTime: event.end,
        },
      ],
    });
  };

  const handleEventResize = (resized) => {
    const dayName = moment(resized.event.end).format("dddd");
    console.log(resized.event.end.toISOString());
    accessSchedulesForm.schedule.map((item) => {
      if (item.day === dayName) {
        item.endTime = resized.event.end.toISOString();
      }
      return item;
    });
    setAccessSchedulesForm({ ...accessSchedulesForm });
  };

  const deleteMenuItems = [
    {
      labale: "Delete",
      items: [
        {
          label: "Update",
          icon: "pi pi-refresh",
        },
      ],
    },
  ];
  const onClickEvent = (e) => {
    const dayName = moment(e.event.end).format("dddd");
    console.log(dayName);

    accessSchedulesForm.schedule.filter((item) => item.day !== dayName);
    setAccessSchedulesForm({ ...accessSchedulesForm });
  };

  return (
    <>
      <Menu
        model={deleteMenuItems}
        popup
        ref={menuDelete}
        id="popup_menu_left"
        popupalignment="left"
      />
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        initialDate={constants.calendarDefaultWeek.start}
        views={{
          timeGridWeek: {
            type: "timeGrid",
            dayHeaderFormat: { weekday: "long" },
          },
        }}
        slotDuration={`00:${duration}:00`}
        headerToolbar=""
        selectable={true}
        expandRows={true}
        editable={true}
        eventStartEditable={false}
        droppable={false}
        eventResourceEditable={false}
        eventResize={handleEventResize}
        select={handleDateSelect}
        // eventClick={onClickEvent}
        events={[
          ...accessSchedulesForm.schedule.map((item) => ({
            start: item.startTime,
            end: item.endTime,
          })),
        ]}
      />
    </>
  );
};

export default AccessCalendar;
