import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardFooter, Dialog, IconButton, Input, Typography } from "@material-tailwind/react";
import { PlusCircle, TrashSimple } from "@phosphor-icons/react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { StudentService } from "@/api/students";

const schema = z.object({
    name: z.string().min(1, { message: "Is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().optional(),
    cpf: z.string().optional(),
    nis: z.string().optional(),
    priorityGroup: z.string().optional(),
    recordNumber: z.string().optional(),
    forwarding: z.string().optional(),
    rg: z.string().optional(),
    street: z.string().optional(),
    neighborhood: z.string().optional(),
    zipCode: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    responsibles: z.array(z.object({
        name: z.string().optional(),
        phone: z.string().optional()
    }))
})

type StudentCreateForm = z.infer<typeof schema>;


export const StudentCreate = () => {
    const [open, setOpen] = React.useState(false);
    const query = useQueryClient();
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<StudentCreateForm>({ resolver: zodResolver(schema) });
    const { fields, append, remove, replace } = useFieldArray({ name: "responsibles", control: control })
    const { CreateStudent } = StudentService()

    const handleOpen = () => {
        if (open == false) {
            setOpen(true)
            append({ name: "", phone: "" })
            reset()
        } else {
            reset()
            replace([])
            setOpen(false)
        }
    };


    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["createStudent"],
        mutationFn: CreateStudent,
        onSuccess() {
            toast.success("Student created successfully");
            query.invalidateQueries();
            handleOpen();
        },
        onError: () => {
            toast.error("Failed to create student");
        }
    })

    const onSubmit = async (data: StudentCreateForm) => {
        await mutateAsync({
            street: data.street,
            city: data.city,
            email: data.email,
            name: data.name,
            forwarding: data.forwarding,
            nis: data.nis,
            priorityGroup: data.priorityGroup,
            recordNumber: data.recordNumber,
            cpf: data.cpf,
            neighborhood: data.neighborhood,
            phone: data.phone,
            responsibles: data.responsibles,
            rg: data.rg,
            state: data.state,
            zipCode: data.zipCode,
        })
    }

    return (
        <>
            <Button onClick={handleOpen} color="green">Create student</Button>
            <Dialog size="md" open={open} handler={handleOpen}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardBody className="flex flex-col gap-4 overflow-y-auto py-5 h-full max-h-[calc(100vh-200px)]">
                            <Typography variant="h6" color="blue-gray">Personal Information</Typography>

                            <div className="grid grid-cols-1 gap-2">
                                <Input label={!!errors.name ? `Name - ${errors.name.message}` : "Name"} error={!!errors.name} color="green" size="lg" {...register("name")} />
                                <Input label={!!errors.email ? `Email - ${errors.email.message}` : "Email"} error={!!errors.email} color="green" size="lg" type="email" {...register("email")} />
                                <Input label={!!errors.cpf ? `CPF - ${errors.cpf.message}` : "CPF"} error={!!errors.cpf} color="green" size="lg" {...register("cpf")} />
                                <Input label={!!errors.rg ? `RG - ${errors.rg.message}` : "RG"} error={!!errors.rg} color="green" size="lg" {...register("rg")} />
                                <Input label={!!errors.phone ? `Phone - ${errors.phone.message}` : "Phone"} error={!!errors.phone} color="green" size="lg" {...register("phone")} />
                                <Input label={!!errors.nis ? `Nis - ${errors.nis.message}` : "Nis"} error={!!errors.nis} color="green" size="lg" {...register("nis")} />
                                <Input label={!!errors.priorityGroup ? `Priority Group - ${errors.priorityGroup.message}` : "Priority Group"} error={!!errors.priorityGroup} color="green" size="lg" {...register("priorityGroup")} />
                                <Input label={!!errors.recordNumber ? `Record Number - ${errors.recordNumber.message}` : "Record Number"} error={!!errors.recordNumber} color="green" size="lg" {...register("recordNumber")} />
                                <Input label={!!errors.forwarding ? `Forwarding - ${errors.forwarding.message}` : "Forwarding"} error={!!errors.forwarding} color="green" size="lg" {...register("forwarding")} />
                            </div>

                            <Typography variant="h6" color="blue-gray">Address Information</Typography>
                            <Input label={!!errors.city ? `City - ${errors.city.message}` : "City"} error={!!errors.city} color="green" size="lg" {...register("city")} />
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                <Input label={!!errors.street ? `Street - ${errors.street.message}` : "Street"} error={!!errors.street} color="green" size="lg" {...register("street")} />
                                <Input label={!!errors.state ? `State - ${errors.state.message}` : "State"} error={!!errors.state} color="green" size="lg" {...register("state")} />
                                <Input label={!!errors.zipCode ? `Postal code - ${errors.zipCode.message}` : "Postal code"} error={!!errors.zipCode} color="green" size="lg" {...register("zipCode")} />
                                <Input label={!!errors.neighborhood ? `Neighborhood - ${errors.neighborhood.message}` : "Neighborhood"} error={!!errors.neighborhood} color="green" size="lg" {...register("neighborhood")} />
                            </div>

                            <div className="flex items-center justify-between">
                                <Typography variant="h6" color="blue-gray">Responsables Information</Typography>
                                <IconButton onClick={() => append({ name: "", phone: "" })} color="green" variant="text">
                                    <PlusCircle weight="duotone" className="w-4 h-4" />
                                </IconButton>
                            </div>
                            {fields.map((field, index) => (
                                <div key={index} className="flex items-center w-full gap-2">
                                    <div key={field.id} className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
                                        <Input color="green" size="lg" {...register(`responsibles.${index}.name`)} label={!!errors.responsibles?.[index]?.name ? `Name - ${errors.responsibles?.[index]?.name?.message}` : "Name"} error={!!errors.responsibles?.[index]?.name} />
                                        <Input color="green" size="lg" {...register(`responsibles.${index}.phone`)} label={!!errors.responsibles?.[index]?.phone ? `Phone - ${errors.responsibles?.[index]?.phone?.message}` : "Phone"} error={!!errors.responsibles?.[index]?.phone} />
                                    </div>
                                    <div>
                                        <IconButton onClick={() => remove(index)} className="text-red-500" color="blue-gray" variant="text">
                                            <TrashSimple weight="duotone" className="w-4 h-4" />
                                        </IconButton>
                                    </div>
                                </div>
                            ))}

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