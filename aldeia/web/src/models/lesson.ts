import { Classe } from "./classe";

export interface Lesson {
    id: string;
    name: string;
    classes: Classe;
    classeId: string;
    createdAt: Date;
    updatedAt: Date;
  }