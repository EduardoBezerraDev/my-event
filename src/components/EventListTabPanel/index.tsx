import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import { Event } from "../../components/EventList/event.interface";
import EventList from "../../components/EventList/index";

type EventListTabPanelProps = {
  value: string;
  events: Event[];
  isLoading: boolean;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EventListTabPanel: React.FC<EventListTabPanelProps> = ({
  value,
  events,
  isLoading,
  handleFilterChange,
}) => {
  return (
    <Box role="tabpanel" hidden={value !== "2"}>
      {value === "2" && (
        <Box maxWidth={600} margin="0 auto" padding={2}>
          <Typography variant="h6" gutterBottom>
            Lista de Eventos
          </Typography>
          <TextField
            data-testId="event-list-title"
            label="Filtrar Eventos"
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
          />
          {isLoading ? (
            <Typography>Carregando eventos...</Typography>
          ) : (
            <EventList events={events} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default EventListTabPanel;
