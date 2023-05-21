
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

export type { EventListProps, Event };
 