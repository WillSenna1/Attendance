import { TeacherService } from "@/api/teachers";
import { UpdateTeacherRequest } from "@/api/teachers/dtos/update-teacher-dto";
import { Teacher } from "@/models/teacher";
import { zodResolver } from "@hookform/resolvers/zod";
import {  Button, Card, CardFooter, CardHeader, Dialog, IconButton, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { PencilSimpleLine } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { TeacherDetailsInformation } from "./information";
import { TeacherDetailsClasses } from "./classes";

type TeacherDetailsProps = {
    teacher: Teacher;
};

const schema = z.object({
    name: z.string().min(1, { message: "Is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Is required" }),
    street: z.string().min(1, { message: "Is required" }),
    neighborhood: z.string().min(1, { message: "Is required" }),
    zipCode: z.string().min(1, { message: "Is required" }),
    city: z.string().min(1, { message: "Is required" }),
    state: z.string().min(1, { message: "Is required" }),
    employment: z.string().optional(),
    cnpj: z.string().optional(),
    companyName: z.string().optional(),
    cpf: z.string().optional(),
    rg: z.string().optional(),
})


type TeacherDetailsType = z.infer<typeof schema>;

export const TeacherDetails = ({ teacher }: TeacherDetailsProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const { UpdateTeacher } = TeacherService();
    const query = useQueryClient();

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<TeacherDetailsType>({
        resolver: zodResolver(schema), defaultValues: {
            name: teacher.user.name,
            email: teacher.user.email,
            phone: teacher.user.phone,
            street: teacher.user.street,
            neighborhood: teacher.user.neighborhood,
            zipCode: teacher.user.zipCode,
            city: teacher.user.city,
            state: teacher.user.state,
            cnpj: teacher.user.employments?.[0]?.cnpj || "",
            companyName: teacher.user.employments?.[0]?.companyName || "",
            cpf: teacher.user.employments?.[0]?.cpf || "",
            employment: teacher.user.employments?.[0]?.type || "",
            rg: teacher.user.employments?.[0]?.rg || "",
        }
    });

    const { isPending, mutateAsync } = useMutation({
        mutationKey: ["updateTeacher"],
        mutationFn: (data: UpdateTeacherRequest) => { return UpdateTeacher(teacher.id, data) },
        onSuccess: () => {
            toast.success("Teacher updated successfully");
            query.invalidateQueries();
            handleOpen();

        },
        onError: () => {
            toast.error("Failed to update Teacher");
        },

    });

    const onSubmit = async (data: TeacherDetailsType) => {
        await mutateAsync({
            email: data.email,
            name: data.name,
            password: teacher.user.password,
            employment: data.employment || "",
            city: data.city,
            cnpj: data.cnpj,
            companyName: data.companyName,
            cpf: data.cpf,
            neighborhood: data.neighborhood,
            phone: data.phone,
            rg: data.rg,
            state: data.state,
            street: data.street,
            zipCode: data.zipCode,
        })
    }

    return (
        <>
            <IconButton onClick={handleOpen} size="sm" variant="text"><PencilSimpleLine size={16} weight="duotone" /></IconButton>

            <Dialog size="lg" open={open} handler={handleOpen}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Tabs value="information">
                        <Card>
                            <CardHeader floated={false} shadow={false}>
                                <TabsHeader className="bg-transparent" indicatorProps={{ className: "bg-gray-900/10 shadow-none !text-gray-900", }}>
                                    <Tab value="information" >Informations</Tab>
                                    <Tab value="classes" >Classes</Tab>
                                </TabsHeader>

                            </CardHeader>

                            <TabsBody>

                                <TabPanel value="information" >
                                    <TeacherDetailsInformation errors={errors} register={register} teacher={teacher} watch={watch} setValue={setValue}/>
                                </TabPanel>

                                <TabPanel value="classes" >
                                    <TeacherDetailsClasses  teacher={teacher} />
                                </TabPanel>
                            </TabsBody>



                            <CardFooter className="flex justify-end items-center w-full">
                                <Button variant="text" color="blue-gray" onClick={handleOpen}>Cancel</Button>
                                <Button loading={isPending} variant="text" color="green" type="submit">Edit</Button>
                            </CardFooter>
                        </Card>



                    </Tabs>
                </form>
            </Dialog>
        </>
    )
}







