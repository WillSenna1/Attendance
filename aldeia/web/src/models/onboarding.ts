import { User } from "./user";

export interface Onboarding {
    id: string;
    userId: string;
    done: boolean;
    user: User;
    createdAt: Date;
    updatedAt: Date;
  }
  