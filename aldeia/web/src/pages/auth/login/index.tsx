import { AuthService } from "@/api/auth";
import { useAuth } from "@/contexts/authProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from "@material-tailwind/react"
import { EnvelopeSimple, LockSimple } from "@phosphor-icons/react"
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Must be at least 6 characters" })
})

export const LoginPage = () => {
    const { Login } = AuthService();
    const { setIsAuthenticated } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
    const navigate = useNavigate();

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["signIn"],
        mutationFn: Login,
        onSuccess: (response) => {
            localStorage.setItem("tokens", JSON.stringify(response));
            setIsAuthenticated(true);
            navigate("/dashboard");
        },
        onError: () => toast.error("Invalid email or password")
    })

    return (
        <Card className="w-full max-w-96 rounded-xl">
            <form onSubmit={handleSubmit((data) => { mutateAsync(data) })}>
                <CardHeader className="text-center" floated={false} shadow={false} >
                    <Typography variant="h4" color="blue-gray" className="mb-2">Welcome back!</Typography>
                </CardHeader>

                <CardBody className="space-y-4">
                    <Input icon={<EnvelopeSimple />} color="green" size="lg" type="email" label={!!errors.email ? `Email - ${errors.email.message}` : "Email"} error={!!errors.email} {...register("email")} />
                    <Input icon={<LockSimple />} color="green" size="lg" type="password" label={!!errors.password ? `Password - ${errors.password.message}` : "Password"} error={!!errors.email} {...register("password")} />
                </CardBody>

                <CardFooter>
                    <Button loading={isPending} type="submit" color="green" fullWidth size="lg" >Log in</Button>
                </CardFooter>
            </form>
        </Card>
    )
}