
interface Event {
    status: boolean;
    end_date: string;
    start_date: string;
    id: number;
    name: string;
}

interface EventListProps {
    events: any;
}

interface RegisteredUser {
    name: string;
    email: string;
    cpf: string;
  }
  

export type { EventListProps, Event, RegisteredUser };
 