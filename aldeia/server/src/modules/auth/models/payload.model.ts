import { Role } from "@prisma/client";



export class IPayload {
    sub: string;
    email: string;
    role: Role;
    type: "access_token" | "refresh_token";
}