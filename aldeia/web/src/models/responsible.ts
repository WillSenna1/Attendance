import { Student } from "./student";

export interface Responsible {
    id: string;
    name: string;
    phone: string;
    student?: Student | null;
    studentId?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }