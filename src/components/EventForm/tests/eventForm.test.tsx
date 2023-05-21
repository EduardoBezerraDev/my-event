import { render, fireEvent } from "@testing-library/react";
import Form from "..";

const mockEvents = [
  { id: 1, name: "Event 1", status: true, start_date: "2023-05-21", end_date: "2023-05-22"  },
  { id: 1, name: "Event 2", status: true, start_date: "2023-05-23", end_date: "2023-05-24"  },
  { id: 1, name: "Event 3", status: true, start_date: "2023-05-25", end_date: "2023-05-26"  },
];

describe("Form", () => {
  test("renders form fields", () => {
    const { getByTestId } = render(
      <Form
        name=""
        cpf=""
        email=""
        events={mockEvents}
        selectedEventId={null}
        isLoading={false}
        isCPFValid={true}
        setName={() => {}}
        setCPF={() => {}}
        setEmail={() => {}}
        setSelectedEventId={() => {}}
        handleSubmit={() => {}}
      />
    );

    expect(getByTestId("form-name")).toBeInTheDocument();
    expect(getByTestId("form-cpf")).toBeInTheDocument();
    expect(getByTestId("form-email")).toBeInTheDocument();
    expect(getByTestId("form-event")).toBeInTheDocument();
    expect(getByTestId("submit-button")).toBeInTheDocument();
  });

  test("calls handleSubmit when form is submitted", () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <Form
        name=""
        cpf=""
        email=""
        events={mockEvents}
        selectedEventId={null}
        isLoading={false}
        isCPFValid={true}
        setName={() => {}}
        setCPF={() => {}}
        setEmail={() => {}}
        setSelectedEventId={() => {}}
        handleSubmit={handleSubmit}
      />
    );

    fireEvent.submit(getByTestId("form"));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test("calls setName when name field is changed", () => {
    const setName = jest.fn();

    const { getByTestId } = render(
      <Form
        name=""
        cpf=""
        email=""
        events={mockEvents}
        selectedEventId={null}
        isLoading={false}
        isCPFValid={true}
        setName={setName}
        setCPF={() => {}}
        setEmail={() => {}}
        setSelectedEventId={() => {}}
        handleSubmit={() => {}}
      />
    );

    fireEvent.change(getByTestId("form-name"), { target: { value: "John" } });
    expect(setName).toHaveBeenCalledWith("John");
  });

});
