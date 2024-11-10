import { useState } from "react";
import { Button, Card, CardBody, CardFooter, Dialog, IconButton, Typography } from "@material-tailwind/react";
import { TrashSimple } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { StudentService } from "@/api/students";
import { Student } from "@/models/student";

type DeleteStudentProps = {
    student: Student;
};

export const StudentDelete = ({ student }: DeleteStudentProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const query = useQueryClient();
    const { DeleteStudent } = StudentService()
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["deleteStudent", student.id],
        mutationFn: () => DeleteStudent(student.id),
        onSuccess() {
            toast.success("Student deleted successfully");
            query.invalidateQueries();
            handleOpen();
        },

        onError() {
            toast.error("Failed to delete student");
        }
    });

    const handleDelete = async () => {
       await mutateAsync();
    };

    return (
        <>
            <IconButton onClick={handleOpen} color="red" size="sm" variant="text">
                <TrashSimple size={16} weight="duotone" />
            </IconButton>

            <Dialog size="sm" open={open} handler={handleOpen}>
                <Card>
                    <CardBody className="space-y-4">
                        <Typography variant="h6" color="blue-gray">Delete Student</Typography>
                        <Typography color="blue-gray">Are you sure you want to delete? This action is irreversible and will permanently remove the student from the system.</Typography>
                    </CardBody>

                    <CardFooter className=" py-4 flex justify-between">
                        <Button color="blue-gray" variant="text" onClick={handleOpen}>Cancel</Button>
                        <Button loading={isPending} color="red" variant="text" onClick={handleDelete}>Delete</Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
};
