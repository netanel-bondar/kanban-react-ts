
export interface Board {
    id: string; 
    title: string;
    // imageUrl: string; 
   // lists: TaskList[];
  }

  export interface TaskList {
    id: string;
    title: string;
    cards: Card[];
    creationDate: string;
    creationTime: string;
  }

  export interface Card {
    id: string;
    title: string;
    description: string;
  }