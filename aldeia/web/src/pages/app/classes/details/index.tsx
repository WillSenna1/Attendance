import { ClasseService } from "@/api/classes";
import { UpdateClasseRequest } from "@/api/classes/dtos/update-classe-dto";
import { Classe } from "@/models/classe";
import { Button, Card, CardBody, CardFooter, Dialog, IconButton, Input, Textarea } from "@material-tailwind/react"
import { PencilSimpleLine } from "@phosphor-icons/react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ClassesDetailsProps = {
    classe: Classe;
}

const schema = z.object({
    name: z.string().min(1, { message: "Is required" }),
    description: z.string().min(1, { message: "Is required" }),
});

type ClasseDetailsType = z.infer<typeof schema>;

export const ClassesDetails = ({ classe }: ClassesDetailsProps) => {
    const [open, setOpen] = useState(false);
    const { UpdateClasse } = ClasseService();
    const handleOpen = () => setOpen(!open);
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ClasseDetailsType>({ defaultValues: { ...classe } });

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["updateClasse"],
        mutationFn: (data: UpdateClasseRequest) => UpdateClasse(classe.id, data),
        onSuccess: () => {
            toast.success("Classe updated successfully");
            queryClient.invalidateQueries();
            handleOpen();
            reset();
        },
        onError: () => {
            toast.error("Failed to update classe");
        }
    });

    const onSubmit = async (data: ClasseDetailsType) => {
        await mutateAsync({
            name: data.name,
        })
    }

    return (
        <>
            <IconButton onClick={handleOpen} size="sm" variant="text"><PencilSimpleLine size={16} weight="duotone" /></IconButton>
            <Dialog size="xs" open={open} handler={handleOpen}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardBody className="flex flex-col gap-4 overflow-auto py-5 ">
                            <Input label={!!errors.name ? `Name - ${errors.name.message}` : "Name"} error={!!errors.name} color="green" size="lg" {...register("name")} />
                            <Textarea label={!!errors.description ? `Description - ${errors.description.message}` : "Description"} error={!!errors.description} color="green" size="lg" {...register("description")} />
                        </CardBody>

                        <CardFooter className="flex justify-end items-center w-full">
                            <Button variant="text" color="blue-gray" onClick={handleOpen}>Cancel</Button>
                            <Button loading={isPending} variant="text" color="green" type="submit">Edit</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Dialog>
        </>
    )
}