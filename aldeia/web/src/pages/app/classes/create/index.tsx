import { ClasseService } from "@/api/classes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardFooter, Dialog, Input, Textarea } from "@material-tailwind/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


const schema = z.object({
    name: z.string().min(1, { message: "Is required" }),
    description: z.string().min(1, { message: "Is required" }),
});

type CreateClasseForm = z.infer<typeof schema>;

export const CreateClasse = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const { CreateClasse } = ClasseService();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateClasseForm>({ resolver: zodResolver(schema) });
    const { isPending, mutateAsync } = useMutation({
        mutationKey: ["createClasse"],
        mutationFn: CreateClasse,
        onSuccess() {
            toast.success("Classe created successfully");
            queryClient.invalidateQueries();
            handleOpen();
            reset()
        },
        onError: () => {
            toast.error("Failed to create classe");
        }
    })

    const onSubmit = async (data: CreateClasseForm) => {
        await mutateAsync(data)
    }

    return (
        <>
            <Button onClick={handleOpen} color="green">Create classe</Button>
            <Dialog size="xs" open={open} handler={handleOpen}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardBody className="space-y-4">
                            <Input label={!!errors.name ? `Name - ${errors.name.message}` : "Name"} error={!!errors.name} color="green" size="lg" {...register("name")} />
                            <Textarea label={!!errors.description ? `Description - ${errors.description.message}` : "Description"} error={!!errors.description} color="green" size="lg" {...register("description")} />
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