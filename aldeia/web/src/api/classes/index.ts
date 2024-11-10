import { Classe } from "../../models/classe";
import { api } from "../client-api";
import { CreateClasseRequest } from "./dtos/create-classe-dto";
import { FindAllClasseRequest, FindAllClasseResponse, FindAllStudentByClassRequest, FindAllStudentByClassResponse } from "./dtos/find-all-classe-dto";
import { UpdateClasseRequest } from "./dtos/update-classe-dto";

const CreateClasse = async (data: CreateClasseRequest) => {
    const response = await api.post("Classes", { json: data }).json<Classe>();

    return response;
}

const FindAllPaginated = async ({ page, perPage }: FindAllClasseRequest) => {
    const response = await api.get("Classes", { searchParams: { page: page, perPage: perPage } }).json<FindAllClasseResponse>();

    return response;
}

const FindAllStudentPaginated = async ({ page, perPage, classId }: FindAllStudentByClassRequest) => {
    const response = await api.get(`Classes/${classId}/students`, { searchParams: { page: page, perPage: perPage } }).json<FindAllStudentByClassResponse>();
    return response;
}

const FindClasseById = async (id: string) => {
    const response = await api.get(`Classes/${id}`).json<Classe>();
    return response;
}

const UpdateClasse = async (id: string, data: UpdateClasseRequest) => {
    const response = await api.patch(`Classes/${id}`, { json: data }).json<Classe>();

    return response;
}

const DeleteClasse = async (id: string) => {
    const response = await api.delete(`Classes/${id}`).json<Classe>();
    return response;
}

const AddStudentToClass = async (classId: string, studentId: string) => {
    const response = await api.post(`Classes/${classId}/students/${studentId}`).json<Classe>();
    return response;
}

const AddTeacherToClass = async (classId: string, teacherId: string) => {
    const response = await api.post(`Classes/${classId}/teachers/${teacherId}`).json<Classe>();
    return response;
}


const RemoveStudentFromClass = async (classId: string, studentId: string) => {
    const response = await api.delete(`Classes/${classId}/students/${studentId}`).json<Classe>();
    return response;
}

const RemoveTeacherFromClass = async (classId: string, teacherId: string) => {
    const response = await api.delete(`Classes/${classId}/teachers/${teacherId}`).json<Classe>();
    return response;
}

export const ClasseService = () => { return { CreateClasse, FindAllPaginated, FindAllStudentPaginated, FindClasseById, UpdateClasse, DeleteClasse, AddStudentToClass, RemoveStudentFromClass, RemoveTeacherFromClass, AddTeacherToClass } }
