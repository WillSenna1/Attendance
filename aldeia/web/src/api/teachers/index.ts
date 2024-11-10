import { api } from "../client-api";
import { Teacher } from "../../models/teacher";
import { CreateTeacherRequest } from "./dtos/create-teacher-dto";
import { FindAllClassByTeacherRequest, FindAllClassByTeacherResponse, FindAllTeacherRequest, FindAllTeacherResponse } from "./dtos/find-all-teacher-dto";
import { UpdateTeacherRequest } from "./dtos/update-teacher-dto";

const CreateTeacher = async (data: CreateTeacherRequest) => {
    const response = await api.post("teachers", { json: data }).json<Teacher>();
    return response;
}

const FindAllPaginated = async ({ page, perPage, search }: FindAllTeacherRequest) => {
    const response = await api.get("teachers", { searchParams: { page: page, perPage: perPage, search: search || "" } }).json<FindAllTeacherResponse>();

    return response;
}

const FindAllClassByTeacherPaginated = async ({ page, perPage, teacherId }: FindAllClassByTeacherRequest) => {
    const response = await api.get(`teachers/${teacherId}/classes`, { searchParams: { page: page, perPage: perPage } }).json<FindAllClassByTeacherResponse>();

    return response;
}

const FindTeacherById = async (id: string) => {
    const response = await api.get(`teachers/${id}`).json<Teacher>();
    return response;
}

const UpdateTeacher = async (id: string, data: UpdateTeacherRequest) => {
    const response = await api.patch(`teachers/${id}`, { json: data }).json<Teacher>();
    return response;
}

const DeleteTeacher = async (id: string) => {
    const response = await api.delete(`teachers/${id}`).json<Teacher>();
    return response;
}

const ResetOnboarding = async (id: string) => {
    const response = await api.get(`teachers/${id}/reset-onboarding`).json<Teacher>();
    return response;
}

export const TeacherService = () => { return { CreateTeacher, FindAllPaginated, FindAllClassByTeacherPaginated, FindTeacherById, UpdateTeacher, DeleteTeacher, ResetOnboarding } }
