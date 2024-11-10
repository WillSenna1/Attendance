import { Classe } from "./classe";
import { Responsible } from "./responsible";

export interface Student {
  id: string;
  name: string;
  email: string;
  cpf: string;
  rg: string;
  phone: string;
  imageUrl: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  classes?: Classe;
  classId?: string;
  responsibles: Responsible[];
  createdAt: Date;
  updatedAt: Date;
}