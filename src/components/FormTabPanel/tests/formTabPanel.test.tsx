import { fireEvent, render, screen } from "@testing-library/react";
import EventFormTabPanel from "../FormTabPanel";

describe("EventFormTabPanel", () => {
  test("renders form fields", () => {
    const name = "John";
    const cpf = "12345678901";
    const email = "john@example.com";
    const events = [
        { id: 1, name: "Event 1", status: true, start_date: "2023-05-21", end_date: "2023-05-22"  },
        { id: 1, name: "Event 2", status: true, start_date: "2023-05-23", end_date: "2023-05-24"  },
        { id: 1, name: "Event 3", status: true, start_date: "2023-05-25", end_date: "2023-05-26"  },
      ];
    const selectedEventId = 1;
    const isCPFValid = true;
    const isLoading = false;
    const configModal = {
      open: false,
      title: "",
      message: "",
      variant: "success",
    };

    render(
      <EventFormTabPanel
        value="1"
        name={name}
        setName={() => {}}
        cpf={cpf}
        setCPF={() => {}}
        email={email}
        setEmail={() => {}}
        events={events}
        selectedEventId={selectedEventId}
        setSelectedEventId={() => {}}
        handleSubmit={() => {}}
        isCPFValid={isCPFValid}
        isLoading={isLoading}
        configModal={configModal}
        setConfigModal={() => {}}
      />
    );

    expect(screen.getByTestId("form-name")).toHaveValue(name);
    expect(screen.getByTestId("form-cpf")).toHaveValue(cpf);
    expect(screen.getByTestId("form-email")).toHaveValue(email);
    expect(screen.getByTestId("form-event")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  test("calls handleSubmit when form is submitted", () => {
    const handleSubmit = jest.fn();

    render(
      <EventFormTabPanel
        value="1"
        name=""
        setName={() => {}}
        cpf=""
        setCPF={() => {}}
        email=""
        setEmail={() => {}}
        events={[]}
        selectedEventId={null}
        setSelectedEventId={() => {}}
        handleSubmit={handleSubmit}
        isCPFValid={true}
        isLoading={false}
        configModal={{
          open: false,
          title: "",
          message: "",
          variant: "success",
        }}
        setConfigModal={() => {}}
      />
    );

    fireEvent.submit(screen.getByTestId("form"));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
