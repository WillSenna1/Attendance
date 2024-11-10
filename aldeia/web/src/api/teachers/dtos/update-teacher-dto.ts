

export interface UpdateTeacherRequest {
    name: string;
    email: string;
    password: string;
    phone?: string;
    street?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    cpf?: string;
    rg?: string;
    cnpj?: string;
    companyName?: string;
    employment: string;
}