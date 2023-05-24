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


export type {FormProps}