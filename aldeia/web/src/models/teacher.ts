import { Classe } from "./classe";
import { User } from "./user";

export interface Teacher {
    id: string;
    userId: string;
    user: User;
    classes: Classe[];
    createdAt: Date;
    updatedAt: Date;
  }
  