

export interface CreateStudentRequest {
    name: string;
    email: string;
    cpf?: string;
    rg?: string;
    phone?: string;
    nis?: string;
    priorityGroup?: string;
    recordNumber?: string;
    forwarding?: string;
    street?: string | null;
    neighborhood?: string | null;
    city?: string | null;
    state?: string | null;
    zipCode?: string | null;
    responsibles: {
        name?: string;
        phone?: string;
    }[];
}