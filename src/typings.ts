
export interface Board {
    id: string; 
    title: string;
    imageUrl: string; 
   // lists: TaskList[];
  }

  export interface TaskList {
    id: string;
    title: string;
    cards: Card[];
  }

  export interface Card {
    id: string;
    title: string;
    description: string;
  }