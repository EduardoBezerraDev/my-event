import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EventList from "..";
import { EventListProps } from "../event.interface";
import "@testing-library/jest-dom/extend-expect";

const theme = createTheme();

describe("EventList", () => {
  const events = [
    { id: 1, name: "Event 1" },
    { id: 2, name: "Event 2" },
  ];

  const renderWithThemeProvider = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders event names", () => {
    renderWithThemeProvider(<EventList events={events} />);
    const eventNames = screen.getAllByTestId("event-name");
    expect(eventNames).toHaveLength(2);
    expect(eventNames[0]).toHaveTextContent("Event 1");
    expect(eventNames[1]).toHaveTextContent("Event 2");
  });

  test("opens modal when 'Ver Inscritos' button is clicked", () => {
    renderWithThemeProvider(<EventList events={events} />);
    const openRegistereds = screen.getAllByTestId("open-registereds");
    fireEvent.click(openRegistereds[0]);
    const modal = screen.getByTestId("modal-registereds");
    expect(modal).toBeInTheDocument();
  });

  test("closes modal when 'Fechar' button is clicked", () => {
    renderWithThemeProvider(<EventList events={events} />);
    const openRegistereds = screen.getAllByTestId("open-registereds");
    fireEvent.click(openRegistereds[0]);
    const closeButton = screen.getByTestId("close-registereds");
    fireEvent.click(closeButton);
    const modal = screen.queryByTestId("modal-registereds");
    expect(modal).not.toBeInTheDocument();
  });

  test("renders 'Nenhum inscrito registrado.' when no users are available", async () => {
    const mockProps: EventListProps = {
      events,
    };

    renderWithThemeProvider(<EventList {...mockProps} />);
    const openRegistereds = screen.getAllByTestId("open-registereds");
    fireEvent.click(openRegistereds[0]);

    const mockResponse = {
      data: [],
      current_page: 1,
      total: 0,
    };
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    } as any);

    await waitFor(() => {
      expect(screen.queryByText("Nenhum inscrito registrado.")).toBeInTheDocument();
    });
  });

  test("renders paginated registered users", async () => {
    const mockProps: EventListProps = {
      events,
    };

    renderWithThemeProvider(<EventList {...mockProps} />);
    const openRegistereds = screen.getAllByTestId("open-registereds");
    fireEvent.click(openRegistereds[0]);

    const mockResponse = {
      data: [
        { name: "User 1", email: "user1@example.com", cpf: "123456789" },
        { name: "User 2", email: "user2@example.com", cpf: "987654321" },
      ],
      current_page: 1,
      total: 2,
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    } as any);

    await waitFor(() => {
  setTimeout(() => {
    const userNames = screen.getAllByTestId("cell-name");
    expect(userNames).toHaveLength(2);
    expect(userNames[0]).toHaveTextContent("User 1");
    expect(userNames[1]).toHaveTextContent("User 2");
  }, 2000);
});
  });
});
