import { ClasseService } from "@/api/classes";
import { TeacherService } from "@/api/teachers";
import { Teacher } from "@/models/teacher";
import { Button, CardBody, IconButton, Option, Select } from "@material-tailwind/react"
import { CaretLeft, CaretRight, TrashSimple } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { TeacherDetailsClassesSkeleton } from "./skeletron";
import { LessonService } from "@/api/lessons";

type TeacherDetailsClasses = {
    teacher: Teacher;

}

export const TeacherDetailsClasses = ({ teacher }: TeacherDetailsClasses) => {
    const [pagination, setPagination] = useState({ page: 1, perPage: 10 })
    const { RemoveTeacherFromClass, AddTeacherToClass } = ClasseService();
    const [classId, setClassId] = useState<string>("");
    const { FindAllClassByTeacherPaginated } = TeacherService();
    const { FindAll } = LessonService();
    const { data: lesson } = useQuery({ queryKey: ["lessonsall"], queryFn: FindAll });

    const { data, refetch, isLoading } = useQuery({ queryKey: ["classeByTeacher", teacher.id], queryFn: () => FindAllClassByTeacherPaginated({ teacherId: teacher.id, page: pagination.page, perPage: pagination.perPage }) })

    const handleNextPage = () => {
        setPagination({ ...pagination, page: pagination.page + 1 })
    }
    const handlePrevPage = () => {
        setPagination({ ...pagination, page: pagination.page - 1 })
    }

    const handleRemoveClass = async (classeId: string) => {
        await RemoveTeacherFromClass(classeId, teacher.id);
        await refetch();
    }

    const handleAddClass = async () => {
        await AddTeacherToClass(classId, teacher.id);
        await refetch();
    }


    return (
        <CardBody className="flex flex-col gap-4 overflow-auto py-5 h-[calc(100vh-100px)] lg:h-[calc(100vh-450px)]">
            <div className="flex items-center justify-between gap-2">
                <Select
                    color="green"
                    size="lg"
                    label="Select Classe"
                    onChange={(e) => setClassId(e || "")}
                    selected={(element) =>
                        element &&
                        React.cloneElement(element, {
                            disabled: true,
                            className:
                                "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                        })
                    }>
                    {lesson && lesson?.length > 0 ? lesson?.map(({ name, id }) => (
                        <Option key={name} value={id} className="flex items-center gap-2">
                            {name}
                        </Option>
                    )) : (
                        <Option disabled>No lessons available</Option>
                    )
                    }
                </Select>
                <Button onClick={() => { handleAddClass() }} color="green">Add Classe</Button>
            </div>
            {isLoading ? (<TeacherDetailsClassesSkeleton />) : (
                <div className="flex flex-col h-full gap-4 mt-5 overflow-auto">
                    {data && data.data.length > 0 ? data?.data?.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg border-blue-gray-100">
                            {item.name}
                            <IconButton onClick={() => { handleRemoveClass(item.id) }} color="red" size="sm" variant="text"> <TrashSimple size={16} weight="duotone" /> </IconButton>
                        </div>
                    )) : (
                        <div>
                            <p className="text-center text-blue-gray-500">No classes found</p>
                        </div>
                    )}
                </div>
            )}

            {data?.meta && data?.meta?.total > 10 && (
                <div className="flex items-center justify-between mt-auto">
                    <Button onClick={() => handlePrevPage()} disabled={!data?.meta?.prev} size="sm" variant="text" color="green" className="flex items-center justify-center gap-2"><CaretLeft /> Back Page</Button>
                    <Button onClick={() => handleNextPage()} disabled={!data?.meta?.next} size="sm" variant="text" color="green" className="flex items-center justify-center gap-2">Next Page <CaretRight /></Button>
                </div>
            )}

        </CardBody >
    )
}