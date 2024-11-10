import { User } from "@prisma/client";



export interface UserWithPassword extends User {
    password: string;
}