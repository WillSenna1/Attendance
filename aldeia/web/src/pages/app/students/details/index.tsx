import { StudentService } from "@/api/students";
import { UpdateStudentRequest } from "@/api/students/dtos/update-student-dto";
import { Student } from "@/models/student";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardFooter, CardHeader, Dialog, IconButton, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { PencilSimpleLine } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { StudentDetailsInformation } from "./information";
import { StudentDetailsClasses } from "./classes";

type StudentDetailsProps = {
    student: Student;
};

const schema = z.object({
    name: z.string().min(1, { message: "Is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().optional(),
    cpf: z.string().optional(),
    rg: z.string().optional(),
    street: z.string().optional(),
    nis: z.string().optional(),
    priorityGroup: z.string().optional(),
    recordNumber: z.string().optional(),
    forwarding: z.string().optional(),
    neighborhood: z.string().optional(),
    observation: z.string().optional(),
    zipCode: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    responsibles: z.array(z.object({
        id: z.string(),
        name: z.string(),
        phone: z.string()
    }))
});



type StudentDetailsType = z.infer<typeof schema>;

export const StudentDetails = ({ student }: StudentDetailsProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const { UpdateStudent } = StudentService();
    const query = useQueryClient();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<StudentDetailsType>({ resolver: zodResolver(schema), defaultValues: { ...student, observation: "" } });
    const { isPending, mutateAsync } = useMutation({
        mutationKey: ["updateStudent"],
        mutationFn: (data: UpdateStudentRequest) => { return UpdateStudent(student.id, data) },
        onSuccess: () => {
            toast.success("Student updated successfully");
            query.invalidateQueries();
            handleOpen();

        },
        onError: () => {
            toast.error("Failed to update student");
        },

    });

    const onSubmit = async (data: StudentDetailsType) => {
        await mutateAsync(data)
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
                                    <StudentDetailsInformation errors={errors} register={register} student={student} watch={watch} />
                                </TabPanel>

                                <TabPanel value="classes" >
                                    <StudentDetailsClasses student={student} />
                                </TabPanel>
                            </TabsBody>



                            <CardFooter className="flex items-center justify-end w-full">
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




