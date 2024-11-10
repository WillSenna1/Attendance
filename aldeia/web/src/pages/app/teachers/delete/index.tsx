import { useState } from "react";
import { Button, Card, CardBody, CardFooter, Dialog, IconButton, Typography } from "@material-tailwind/react";
import { TrashSimple } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Teacher } from "@/models/teacher";
import { TeacherService } from "@/api/teachers";

type DeleteTeacherProps = {
    teacher: Teacher;
};

export const TeacherDelete = ({ teacher }: DeleteTeacherProps) => {
    const [open, setOpen] = useState(false);
    const query = useQueryClient();
    const { DeleteTeacher } = TeacherService();
    const handleOpen = () => setOpen(!open);
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["deleteTeacher", teacher.id],
        mutationFn: () => DeleteTeacher(teacher.id),
        onSuccess() {
            toast.success("Teacher deleted successfully");
            query.invalidateQueries();
            handleOpen();
        },

        onError() {
            toast.error("Failed to delete Teacher");
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
                        <Typography variant="h6" color="blue-gray">Delete Teacher</Typography>
                        <Typography color="blue-gray">Are you sure you want to delete? This action is irreversible and will permanently remove the teacher from the system.</Typography>
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
