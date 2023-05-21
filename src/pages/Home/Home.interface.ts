interface Event {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
  }
  
  interface RegisteredEvent {
    id: number;
    name: string;
  }
  
  export type {Event, RegisteredEvent} 