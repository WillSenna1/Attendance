import { userService } from "@/api/users";
import { useAuth } from "@/contexts/authProvider"
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Input, Option, Select, Typography } from "@material-tailwind/react"
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


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
});

type FormValues = z.infer<typeof schema>;

export const SettingsPage = () => {
    const { user } = useAuth();
    const { UpdateMe } = userService();

    const { register, formState: { errors }, watch, setValue, handleSubmit } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: user?.email,
            name: user?.name,
            phone: user?.phone || "",
            cnpj: user?.employments?.[0]?.cnpj || "",
            employment: user?.employments?.[0]?.type.toString() || "",
            rg: user?.employments?.[0]?.rg || "",
            cpf: user?.employments?.[0]?.cpf || "",
            companyName: user?.employments?.[0]?.companyName || "",
            city: user?.city || "",
            neighborhood: user?.neighborhood || "",
            state: user?.state || "",
            street: user?.street || "",
            zipCode: user?.zipCode || "",
        }
    });



    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["UpdateUser"],
        mutationFn: UpdateMe,
        onSuccess() {
            toast.success("User updated successfully");
        },
        onError() {
            toast.error("Failed to update user");
        }
    })

    const onSubmit = async (data: FormValues) => {
        await mutateAsync({
            id: user?.id || "",
            name: data.name,
            email: data.email,
            phone: data.phone,
            employment: data.employment || "",
            street: data.street,
            neighborhood: data.neighborhood,
            state: data.state,
            zipCode: data.zipCode,
            city: data.city,
            cnpj: data.cnpj,
            companyName: data.companyName,
            cpf: data.cpf,
            rg: data.rg,

        });
    }

    return (
        <div className="p-10">
            <main className="mt-10 space-y-4">
                <Card className="m-auto max-w-screen-lg">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardHeader className="flex justify-center items-center" floated={false} shadow={false}>
                            <Avatar src={user.imageUrl} size="xxl" />
                        </CardHeader>

                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h6" color="blue-gray">Personal Information</Typography>
                            <div className="grid grid-cols-1 gap-2">
                                <Input label={!!errors.name ? `Name - ${errors.name.message}` : "Name"} error={!!errors.name} color="green" size="lg" {...register("name")} />
                                <Input label={!!errors.email ? `Email - ${errors.email.message}` : "Email"} error={!!errors.email} color="green" size="lg" type="email" {...register("email")} />
                                <Input label={!!errors.phone ? `Phone - ${errors.phone.message}` : "Phone"} error={!!errors.phone} color="green" size="lg" {...register("phone")} />
                            </div>

                            <Typography variant="h6" color="blue-gray">Address Information</Typography>
                            <Input label={!!errors.street ? `Street - ${errors.street.message}` : "Street"} error={!!errors.street} color="green" size="lg" {...register("street")} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <Input label={!!errors.city ? `City - ${errors.city.message}` : "City"} error={!!errors.city} color="green" size="lg" {...register("city")} />
                                <Input label={!!errors.state ? `State - ${errors.state.message}` : "State"} error={!!errors.state} color="green" size="lg" {...register("state")} />
                                <Input label={!!errors.zipCode ? `Postal code - ${errors.zipCode.message}` : "Postal code"} error={!!errors.zipCode} color="green" size="lg" {...register("zipCode")} />
                                <Input label={!!errors.neighborhood ? `Neighborhood - ${errors.neighborhood.message}` : "Neighborhood"} error={!!errors.neighborhood} color="green" size="lg" {...register("neighborhood")} />
                            </div>

                            <Typography variant="h6" color="blue-gray">Employment Information</Typography>
                            <Select value={watch().employment} label={!!errors.employment ? `Contract - ${errors.employment.message}` : "Contract"} error={!!errors.employment} color="green" size="lg" onChange={(e) => { setValue("employment", e) }}>
                                <Option value="CNPJ">CNPJ</Option>
                                <Option value="CLT">CLT</Option>
                            </Select>

                            {watch().employment === "CNPJ" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <Input label={!!errors.cnpj ? `CNPJ - ${errors.cnpj.message}` : "CNPJ"} error={!!errors.cnpj} color="green" size="lg" {...register("cnpj")} />
                                    <Input label={!!errors.companyName ? `Company Name - ${errors.companyName.message}` : "Company Name"} error={!!errors.companyName} color="green" size="lg" {...register("companyName")} />
                                </div>
                            )}

                            {watch().employment === "CLT" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <Input label={!!errors.cpf ? `CPF - ${errors.cpf.message}` : "CPF"} error={!!errors.cpf} color="green" size="lg" {...register("cpf")} />
                                    <Input label={!!errors.rg ? `RG - ${errors.rg.message}` : "RG"} error={!!errors.rg} color="green" size="lg" {...register("rg")} />
                                </div>
                            )}
                        </CardBody>

                        <CardFooter>
                            <div className="flex justify-end items-center w-full">
                                <Button loading={isPending} color="green" type="submit" >Update</Button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </main>
        </div>
    )
}