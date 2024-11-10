import { User } from "./user";

export enum EmploymentType {
  CLT= 'CLT',
  CNPJ= 'CNPJ',
}


export interface Employment {
    id: string;
    userId: string;
    user: User;
    cpf: string | null;
    rg: string | null;
    cnpj: string | null;
    companyName: string | null;
    type: EmploymentType;
    createdAt: Date;
    updatedAt: Date;
  }
  

