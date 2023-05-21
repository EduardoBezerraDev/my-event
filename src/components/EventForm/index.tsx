import React from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    TextField,
    Chip,
    Typography,
} from "@mui/material";
import { formatCPF } from "../../utils/cpf";
import { Event } from "../EventList/event.interface";
import { format } from "date-fns";
interface FormProps {
    name: string;
    cpf: string;
    email: string;
    events: Event[];
    selectedEventId: number | null;
    isLoading: boolean;
    isCPFValid: boolean;
    setName: (name: string) => void;
    setCPF: (cpf: string) => void;
    setEmail: (email: string) => void;
    setSelectedEventId: (selectedEventId: number) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const Form: React.FC<FormProps> = ({
    name,
    cpf,
    email,
    events,
    selectedEventId,
    isLoading,
    isCPFValid,
    setSelectedEventId,
    setName,
    setCPF,
    setEmail,
    handleSubmit,
}) => {
    const handleCPFChange = (value: string) => {
        const maskedCPF = formatCPF(value);
        setCPF(maskedCPF);
    };

    const renderEventMenuItem = (event: Event) => (
        <MenuItem key={event.id} value={event.id}>
          <div>
            <Typography variant="subtitle1">
              <Chip
                size="small"
                color={event.status ? "primary" : "error"}
                label={event.status ? "Ativo" : "Inativo"}
              />
              <span> {event.name}</span>
            </Typography>
            <div style={{ marginLeft: 50 }}>
              <Typography variant="caption">
                Data de Início: {format(new Date(event.start_date), "dd/MM/yyyy")}
              </Typography>
              <br />
              <Typography variant="caption">
                Data de Término: {format(new Date(event.end_date), "dd/MM/yyyy")}
              </Typography>
            </div>
          </div>
        </MenuItem>
      );

    const renderSubmitButtonLabel = () => (isLoading ? "Aguarde..." : "Inscrever-se");

    return (
        <form onSubmit={handleSubmit} data-testid = "form">
            <TextField
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                inputProps={{ minLength: 4, maxLength: 50, "data-testid": "form-name" }}
                required
            />
            <TextField
                label="CPF"
                value={cpf}
                onChange={(e) => handleCPFChange(e.target.value)}
                fullWidth
                margin="normal"
                inputProps={{ "data-testid": "form-cpf" }}
                required
                error={!isCPFValid && cpf.length > 0}
                helperText={!isCPFValid && cpf.length > 0 && "CPF inválido"}
            />
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                inputProps={{ minLength: 10, maxLength: 50, type: "email",  "data-testid": "form-email" }}
                required
            />
            <FormControl fullWidth margin="normal" required>
                <InputLabel id="event">Age</InputLabel>
                <Select
                    labelId="event"
                    data-testid="form-event"
                    value={selectedEventId || ""}
                    onChange={(e) => setSelectedEventId(Number(e.target.value))}
                    autoWidth
                >
                    {events.map(renderEventMenuItem)}
                </Select>
            </FormControl>
            <Button
                data-testid="submit-button"
                type="submit"
                variant="contained"
                color="primary"
                style={{ float: "right", marginTop: "20px" }}
                disabled={isLoading}
            >
                {renderSubmitButtonLabel()}
            </Button>
        </form>
    );
};

export default Form;
