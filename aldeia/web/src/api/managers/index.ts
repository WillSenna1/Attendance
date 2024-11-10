import { Manager } from "../../models/manager";
import { api } from "../client-api";
import { CreateManagerRequest } from "./dtos/create-manager-dto";
import { FindAllManagerRequest, FindAllManagerResponse } from "./dtos/find-all-manager-dto";
import { UpdateManagerRequest } from "./dtos/update-manager-dto";


const CreateManager = async (data: CreateManagerRequest) => {
    const response = await api.post("Managers", { json: data }).json<Manager>();
    return response;
}

const FindAllPaginated = async ({ page, perPage }: FindAllManagerRequest) => {
    const response = await api.get("Managers", { searchParams: { page: page, perPage: perPage } }).json<FindAllManagerResponse>();
    return response;
}

const FindManagerById = async (id: string) => {
    const response = await api.get(`Managers/${id}`).json<Manager>();
    return response;
}

const UpdateManager = async (id: string, data: UpdateManagerRequest) => {
    const response = await api.put(`Managers/${id}`, { json: data }).json<Manager>();
    return response;
}

const DeleteManager = async (id: string) => {
    const response = await api.delete(`Managers/${id}`).json<Manager>();
    return response;
}

export const ManagerService = () => { return { CreateManager, FindAllPaginated, FindManagerById, UpdateManager, DeleteManager } }