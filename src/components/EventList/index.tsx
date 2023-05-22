import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TextField,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { API_BASE_URL } from "../../consts";
import { EventListProps } from "./event.interface";
import { Event } from "./event.interface";

interface RegisteredUser {
  name: string;
  email: string;
  cpf: string;
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchRegisteredEvents = async (isQuerySearch = false) => {
    try {
      if (selectedEvent) {
        const response = await fetch(
          `${API_BASE_URL}/registrations/filter?column=name&filter=${searchQuery}&eventId=${selectedEvent}&page=${currentPage}`
        );
        const { data, current_page, total } = await response.json();
        setRegisteredUsers(data);
        setTotalUsers(total);
        setCurrentPage(current_page);
      }
    } catch (error) {
      console.log("Error fetching registered events:", error);
    }
  };

  const handleEventClick = (eventId: number) => {
    setSelectedEvent(eventId);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const renderRegisteredUsers = () => {
    if (registeredUsers.length > 0) {
      return (
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>E-Mail</TableCell>
                <TableCell>CPF</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registeredUsers.map((info: RegisteredUser, index: number) => (
                <TableRow key={index}>
                  <TableCell data-testid="cell-name">{info.name}</TableCell>
                  <TableCell data-testid="cell-email">{info.email}</TableCell>
                  <TableCell data-testid="cell-cpf">{info.cpf}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            count={Math.ceil(totalUsers / usersPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            style={{ marginTop: "10px" }}
          />
        </div>
      );
    } else {
      return <Typography variant="h6">Nenhum inscrito registrado.</Typography>;
    }
  };

  useEffect(() => {
    fetchRegisteredEvents();
  }, [selectedEvent, currentPage, usersPerPage]);

  useEffect(() => {
    if(searchQuery=='' && selectedEvent){
      fetchRegisteredEvents();
    }
  }, [searchQuery])
  

  return (
    <Box width="100%" maxWidth={700} margin="0 auto" padding={2} style = {{overflow:'auto', maxHeight: '54vh'}}>
      {events.map((event: Event) => (
        <Box key={event.id} marginBottom={2}>
          <Typography variant="h5" data-testid="event-name">{event.name}</Typography>
          <Button
            data-testid="open-registereds"
            variant="contained"
            onClick={() => handleEventClick(event.id)}
          >
            Ver Inscritos
          </Button>
        </Box>
      ))}
      <Modal data-testid="modal-registereds" open={selectedEvent !== null} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "600px",
            bgcolor: "background.paper",
            border: "2px solid",
            borderRadius: 2,
            p: 2,
            maxHeight: "95vh",
            minHeight: "95vh",
            overflowY: "auto",
          }}
        >
          <Box marginBottom={2}>
            <TextField
              data-testId="event-filter"
              label="Filtrar por nome"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
            />
            <Button
              onClick={() => fetchRegisteredEvents(true)}
              variant="outlined"
              style={{ float: "right", marginTop: 10 }}
            >
              Buscar
            </Button>
          </Box>
          {renderRegisteredUsers()}
          <Button
            data-testid="close-registereds"
            variant="contained"
            onClick={handleCloseModal}
            style={{ marginTop: "10px" }}
          >
            Fechar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default EventList;
