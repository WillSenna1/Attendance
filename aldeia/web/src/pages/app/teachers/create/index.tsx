import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardFooter, Dialog, Input, Typography } from "@material-tailwind/react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { TeacherService } from "@/api/teachers";


const schema = z.object({
    name: z.string().min(1, { message: "Is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Is required" }),
    password: z.string().min(6, { message: "Should contain at least 6 characters" }),
});

type TeacherCreateForm = z.infer<typeof schema>;

export const TeacherCreate = () => {
    const [open, setOpen] = useState(false);
    const query = useQueryClient();
    const { CreateTeacher } = TeacherService();
    const handleOpen = () => setOpen(!open);
    const { register, handleSubmit, formState: { errors } } = useForm<TeacherCreateForm>({ resolver: zodResolver(schema) })
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["createTeacher"],
        mutationFn: CreateTeacher,
        onSuccess() {
            toast.success("Teacher created successfully");
            query.invalidateQueries();
            handleOpen();
        },
        onError: () => {
            toast.error("Failed to create teacher");
        }
    });

    const onSubmit = async (data: TeacherCreateForm) => {
        mutateAsync(data);
    }

    return (
        <>
            <Button onClick={handleOpen} color="green">Create teacher</Button>
            <Dialog size="sm" open={open} handler={handleOpen}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardBody className="flex flex-col gap-4 overflow-y-auto py-5 h-full max-h-[calc(100vh-200px)]">
                            <Typography variant="h6" color="blue-gray">Personal Information</Typography>
                            <div className="grid grid-cols-1 gap-2">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                    <Input label={!!errors.name ? `Name - ${errors.name.message}` : "Name"} error={!!errors.name} color="green" size="lg" {...register("name")} />
                                    <Input label={!!errors.email ? `Email - ${errors.email.message}` : "Email"} error={!!errors.email} color="green" type="email" size="lg" {...register("email")} />
                                </div>
                                <Input label={!!errors.phone ? `Phone - ${errors.phone.message}` : "Phone"} error={!!errors.phone} color="green" size="lg" {...register("phone")} />
                                <Input label={!!errors.password ? `Password - ${errors.password.message}` : "Password"} error={!!errors.password} color="green" size="lg" {...register("password")} />
                            </div>
                        </CardBody>
                        <CardFooter className="flex justify-end items-center w-full">
                            <Button variant="text" color="gray" onClick={handleOpen}>Cancel</Button>
                            <Button loading={isPending} variant="text" color="green" type="submit">Create</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Dialog>
        </>
    )
}