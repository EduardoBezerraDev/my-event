import React, { useEffect, useState } from "react";
import {
  Box,
  Tab,
} from "@mui/material";
import { ConfigModal } from "../../components/Modal/modal.interface";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { API_BASE_URL } from "../../consts";
import { Event } from "../../components/EventList/event.interface";
import { formatCPF, validateCPF } from "../../utils/cpf";
import EventFormTabPanel from "../../components/FormTabPanel/FormTabPanel";
import EventListTabPanel from "../../components/EventListTabPanel";
import TabPanel from "@mui/lab/TabPanel/TabPanel";

const defaultModalValues: ConfigModal = {
  open: false,
  title: "",
  message: "",
  variant: "success",
};


const Home: React.FC = () => {
  const [tabItem, setTabItem] = useState<string>("1");
  const [name, setName] = useState<string>("");
  const [cpf, setCPF] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [configModal, setConfigModal] = useState<ConfigModal>(defaultModalValues);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCPFValid, setIsCPFValid] = useState<boolean>(true);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/events`);
      const { data } = await response.json();
      setEvents(data);
      setFilteredEvents(data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching events:", error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const event = events.find((event) => event.id === selectedEventId);
    if (!event) return;

    if (!event.status) {
      setConfigModal({
        open: true,
        title: "Evento Indisponível",
        message: "Desculpe, este evento não está disponível para inscrição.",
        variant: "error",
      });
      return;
    }

    const formData = {
      startDate: event.start_date,
      endDate: event.end_date,
      name,
      cpf,
      email,
      event: selectedEventId,
    };

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setConfigModal({
          open: true,
          title: "Reservado",
          message: "Parabéns! você se registrou no evento",
          variant: "success",
        });
      } else {
        const { message } = await response.json();
        setConfigModal({
          open: true,
          title: "Houve um conflito",
          message,
          variant: "error",
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(searchTerm)
    );
    setFilteredEvents(filtered);
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabItem(newValue);
  };

  const handleCPFChange = (value: string) => {
    const maskedCPF = formatCPF(value);
    setCPF(maskedCPF);
    setIsCPFValid(validateCPF(maskedCPF));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <TabContext value={tabItem}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Inscrição" value="1"></Tab>
            <Tab label="Eventos" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <EventFormTabPanel
            value="1"
            name={name}
            setName={setName}
            cpf={cpf}
            setCPF={handleCPFChange}
            email={email}
            setEmail={setEmail}
            events={filteredEvents}
            selectedEventId={selectedEventId}
            setSelectedEventId={setSelectedEventId}
            handleSubmit={handleSubmit}
            isCPFValid={isCPFValid}
            isLoading={isLoading}
            configModal={configModal}
            setConfigModal={setConfigModal}
          />
        </TabPanel>
        <TabPanel value="2">
          <EventListTabPanel
            value="2"
            events={filteredEvents}
            handleFilterChange={handleFilterChange}
            isLoading={isLoading}
          />
        </TabPanel>


      </TabContext>



    </div>
  );
};

export default Home;
