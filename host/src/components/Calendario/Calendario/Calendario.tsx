import { useState, useEffect } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendario.css";
import AgendamentoModal from "../../Modals/AgendamentoModal";
import AgendamentoPresenter from "../../../presenters/AgendamentoPresenter";
import AgendamentoGetAll from "../../../useCases/agendamento/AgendamentoGetAll";
import { useParams } from "react-router-dom";
import { StatusAgendamento } from "../../../enum/StatusAgendamento";

const localizer = momentLocalizer(moment);

export const Calendario = () => {
  const [events, setEvents] = useState<AgendamentoPresenter[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<AgendamentoPresenter | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { idEmpresa } = useParams<{ idEmpresa: string }>();


  const fetchAgendamentos = async () => {
    try {
      const agendamentoService = new AgendamentoGetAll();
      const data = await agendamentoService.execute(idEmpresa as string);
      const mapped = data.map((item: any) => ({
        ...item,
        start: new Date(item.dataHoraInicio),
        end: new Date(item.dataHoraFim),
        title: item.agendamentoServico?.map((s: any) => s.servico.descricao).join(", ") || "Sem título",
      }));
      setEvents(mapped);
    } catch (err) {
      console.error("Erro ao carregar agendamentos:", err);
    }
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    console.log(slotInfo.start);
    
    setSelectedEvent({
      statusAgendamento: StatusAgendamento.PENDENTE,
      dataHoraInicio: slotInfo.start,
      dataHoraFim: slotInfo.end,
      observacao: "",
      valorTotal: 0,
      idCliente: 0,
      idUsuario: 0,
      idServico: [],
      agendamentoServico: [],
    } as AgendamentoPresenter);

    setModalOpen(true);
  };

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
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
      />

      <AgendamentoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        event={selectedEvent}
        idEmpresa={idEmpresa as string}
        onSuccess={fetchAgendamentos}
      />
    </div>
  );
};
