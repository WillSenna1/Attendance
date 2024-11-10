import { User } from "./user";

export interface Manager {
    id: string;
    userId: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
  }