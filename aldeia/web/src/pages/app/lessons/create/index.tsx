import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardFooter, Dialog, Input, Option, Select } from "@material-tailwind/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { LessonService } from "@/api/lessons";

const schema = z.object({
    name: z.string().min(1, { message: "Is required" }),

});

type LessonsCreateForm = z.infer<typeof schema>;

export const LessonsCreate = () => {
    const [open, setOpen] = useState(false);
    const query = useQueryClient();
    const { CreateLesson, FindAll } = LessonService();
    const [classId, setClassId] = useState<string>("");
    const handleOpen = () => setOpen(!open);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<LessonsCreateForm>({ resolver: zodResolver(schema) })
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["createLesson"],
        mutationFn: CreateLesson,
        onSuccess() {
            toast.success("Lesson created successfully");
            query.invalidateQueries();
            handleOpen();
            reset();
        },
        onError: () => {
            toast.error("Failed to create lesson");
        }
    });

    const { data } = useQuery({ queryKey: ["lessonsall"], queryFn: FindAll });

    const onSubmit = async (data: LessonsCreateForm) => {
        mutateAsync({
            classId: classId,
            name: data.name
        });
    }

    return (
        <>
            <Button onClick={handleOpen} color="green">Create lesson</Button>
            <Dialog size="sm" open={open} handler={handleOpen}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardBody className="space-y-4">
                            <Input label={!!errors.name ? `Name - ${errors.name.message}` : "Name"} error={!!errors.name} color="green" size="lg" {...register("name")} />

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
                                {data?.map(({ name, id }) => (
                                    <Option key={name} value={id} className="flex items-center gap-2">
                                        {name}
                                    </Option>
                                ))}
                            </Select>

                        </CardBody>
                        <CardFooter className="flex items-center justify-end w-full">
                            <Button variant="text" color="gray" onClick={handleOpen}>Cancel</Button>
                            <Button loading={isPending} variant="text" color="green" type="submit">Create</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Dialog>
        </>
    )
}