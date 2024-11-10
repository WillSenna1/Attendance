import { Lesson } from "./lesson";
import { Student } from "./student";
import { Teacher } from "./teacher";

export interface Classe {
    id: string;
    name: string;
    teachers: Teacher[];
    students: Student[];
    lessons: Lesson[];
    createdAt: Date;
    updatedAt: Date;
    _count: {
        students: number;
        teachers: number;
        lessons: number;
    }
  }
  