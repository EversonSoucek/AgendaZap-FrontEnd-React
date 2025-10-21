import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import AgendamentoPresenter from "../../presenters/AgendamentoPresenter";
import AgendamentoForm from "../Forms/AgendamentoForm/AgendamentoForm"; // CREATE
import AgendamentoEditForm from "../Forms/AgendamentoForm/AgendamentoEditForm"; // EDIT

interface AgendamentoModalProps {
    open: boolean;
    onClose: () => void;
    event?: AgendamentoPresenter | null;
    idEmpresa?: string;
    onSuccess?: () => void;
}

const AgendamentoModal: React.FC<AgendamentoModalProps> = ({
    open,
    onClose,
    event,
    idEmpresa = "",
    onSuccess,
}) => {
    const isEditing = Boolean(event?.idAgendamento);

    const handleSuccess = () => {
        onClose();
        onSuccess?.();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
        >
            <DialogContent>
                {isEditing && event ? (
                    <AgendamentoEditForm
                        agendamento={event}
                        idEmpresa={idEmpresa}
                        onSuccess={handleSuccess}
                        onCancel={onClose} // aqui fecha o modal
                    />
                ) : (
                    <AgendamentoForm
                        data={event?.dataHoraInicio as Date}
                        idEmpresa={idEmpresa}
                        onSuccess={handleSuccess}
                        onCancel={onClose} // aqui fecha o modal
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AgendamentoModal;
