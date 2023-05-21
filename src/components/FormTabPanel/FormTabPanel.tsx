import React from "react";
import { Box } from "@mui/material";
import { Event } from "../../components/EventList/event.interface";
import { ConfigModal } from "../../components/Modal/modal.interface";
import Form from "../../components/EventForm";
import ModalCustom from "../../components/Modal";

const defaultModalValues: ConfigModal = {
  open: false,
  title: "",
  message: "",
  variant: "success",
};

type FormTabPanelProps = {
  value: string;
  name: string;
  setName: (name: string) => void;
  cpf: string;
  setCPF: (cpf: string) => void;
  email: string;
  setEmail: (email: string) => void;
  events: Event[];
  selectedEventId: number | null;
  setSelectedEventId: (eventId: number | null) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isCPFValid: boolean;
  isLoading: boolean;
  configModal: ConfigModal;
  setConfigModal: (configModal: ConfigModal) => void;
};

const EventFormTabPanel: React.FC<FormTabPanelProps> = ({
  value,
  name,
  setName,
  cpf,
  setCPF,
  email,
  setEmail,
  events,
  selectedEventId,
  setSelectedEventId,
  handleSubmit,
  isCPFValid,
  isLoading,
  configModal,
  setConfigModal,
}) => {
  return (
    <Box role="tabpanel" hidden={value !== "1"}>
      {value === "1" && (
        <Box maxWidth={600} margin="0 auto" padding={2}>
          <Form
            name={name}
            setName={setName}
            cpf={cpf}
            setCPF={setCPF}
            email={email}
            setEmail={setEmail}
            events={events}
            selectedEventId={selectedEventId}
            setSelectedEventId={setSelectedEventId}
            handleSubmit={handleSubmit}
            isCPFValid={isCPFValid}
            isLoading={isLoading}
          />
          <ModalCustom
            configModal={configModal}
            onClose={() => setConfigModal(defaultModalValues)}
          />
        </Box>
      )}
    </Box>
  );
};

export default EventFormTabPanel;
