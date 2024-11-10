import { Student } from "../../models/student";
import { api } from "../client-api";
import { CreateStudentRequest } from "./dtos/create-student-dto";
import { FindAllClassByStudentRequest, FindAllClassByStudentResponse, FindAllStudentRequest, FindAllStudentResponse } from "./dtos/find-all-student-dto";
import { UpdateStudentRequest } from "./dtos/update-student-dto";

const CreateStudent = async (data: CreateStudentRequest) => {
    const response = await api.post("Students", { json: data }).json<Student>();
    return response;
}

const FindAllPaginated = async ({ page, perPage, search }: FindAllStudentRequest) => {
    const response = await api.get("Students", { searchParams: { page: page, perPage: perPage, search: search || "" } }).json<FindAllStudentResponse>();
    return response;
}

const FindAllClassByStudentPaginated = async ({ page, perPage, studentId }: FindAllClassByStudentRequest) => {
    const response = await api.get(`Students/${studentId}/classes`, { searchParams: { page: page, perPage: perPage } }).json<FindAllClassByStudentResponse>();
    return response;

}

const FindStudentById = async (id: string) => {
    const response = await api.get(`Students/${id}`).json<Student>();
    return response;
}

const UpdateStudent = async (id: string, data: UpdateStudentRequest) => {
    console.log(data);
    const response = await api.patch(`Students/${id}`, { json: data }).json<Student>();
    return response;
}

const DeleteStudent = async (id: string) => {
    const response = await api.delete(`Students/${id}`).json<Student>();
    return response;
}

export const StudentService = () => { return { CreateStudent, FindAllPaginated, FindAllClassByStudentPaginated, FindStudentById, UpdateStudent, DeleteStudent } }