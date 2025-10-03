import { useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "./Calendario.css"

const localizer = momentLocalizer(moment)

export const Calendario = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Reunião com equipe",
      start: new Date(2025, 9, 4, 10, 0),
      end: new Date(2025, 9, 4, 11, 30),
      description: "Discutir roadmap do produto",
      tipo: "reunião",
      local: "Sala 1",
      convidados: ["João", "Maria"]
    },
    {
      id: 2,
      title: "Consulta",
      start: new Date(2025, 9, 5, 14, 0),
      end: new Date(2025, 9, 5, 15, 0),
    },
  ])

  return (
    <div className="container calendario" style={{ height: "600px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["month", "week", "day"]}
        style={{ height: "100%" }}
        onSelectEvent={(event) => alert(`Evento: ${event.title}`)}
        onSelectSlot={(slotInfo) =>
          alert(`Novo evento em: ${slotInfo.start.toLocaleString()}`)
        }
        selectable
      />
    </div>
  )
}
