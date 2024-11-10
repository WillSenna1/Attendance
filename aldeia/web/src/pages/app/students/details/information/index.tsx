import { Student } from "@/models/student"
import { Avatar, CardBody, Input, Textarea, Typography } from "@material-tailwind/react"

type StudentDetailsInformationProps = {
    student: Student;
    errors: any;
    register: any;
    watch: any;
}

export const StudentDetailsInformation = ({ student, errors, register, watch }: StudentDetailsInformationProps) => {


    return (
        <CardBody className="flex flex-col gap-4 overflow-auto py-5 h-[calc(100vh-100px)] lg:h-[calc(100vh-300px)]">
            <div className="p-4 border-2 rounded-md">
                <div className="flex items-center gap-4">
                    <Avatar src={student.imageUrl} alt={watch().name} size="xl" />
                    <div className="flex flex-col">
                        <Typography variant="h6" color="blue-gray" className="font-normal">{watch().name}</Typography>
                        <Typography variant="small" color="blue-gray" className="font-normal opacity-70">{watch().email}</Typography>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-between gap-2 lg:flex-row">
                <div className="w-full p-4 border-2 rounded-md">
                    <Typography variant="h6" color="blue-gray">Personal Information</Typography>
                    <div className="grid grid-cols-1 gap-2 mt-5 space-y-2">
                        <Input color="green" size="lg" {...register("name")} label={!!errors.name ? `Name - ${errors.name.message}` : "Name"} error={!!errors.name} />
                        <Input color="green" size="lg" {...register("email")} label={!!errors.email ? `Email - ${errors.email.message}` : "Email"} error={!!errors.email} />
                        <Input color="green" size="lg" {...register("cpf")} label={!!errors.cpf ? `CPF - ${errors.cpf.message}` : "CPF"} error={!!errors.cpf} />
                        <Input color="green" size="lg" {...register("rg")} label={!!errors.rg ? `RG - ${errors.rg.message}` : "RG"} error={!!errors.rg} />
                        <Input color="green" size="lg" {...register("phone")} label={!!errors.phone ? `Phone - ${errors.phone.message}` : "Phone"} error={!!errors.phone} />
                        <Input color="green" size="lg" {...register("nis")} label={!!errors.nis ? `Nis - ${errors.phone.message}` : "Nis"} error={!!errors.nis} />
                        <Input color="green" size="lg" {...register("priorityGroup")} label={!!errors.priorityGroup ? `Priority Group - ${errors.phone.message}` : "Priority Group"} error={!!errors.priorityGroup} />
                        <Input color="green" size="lg" {...register("recordNumber")} label={!!errors.recordNumber ? `Record Number - ${errors.recordNumber.message}` : "Record Number"} error={!!errors.recordNumber} />
                        <Input color="green" size="lg" {...register("forwarding")} label={!!errors.forwarding ? `Forwarding - ${errors.forwarding.message}` : "Forwarding"} error={!!errors.forwarding} />
                    </div>
                </div>

                <div className="w-full p-4 border-2 rounded-md">
                    <Typography variant="h6" color="blue-gray">Address Information</Typography>
                    <div className="grid grid-cols-1 gap-2 mt-5 space-y-2">
                        <Input color="green" size="lg" {...register("street")} label={!!errors.street ? `Street - ${errors.street.message}` : "Street"} error={!!errors.street} />
                        <Input color="green" size="lg" {...register("city")} label={!!errors.city ? `City - ${errors.city.message}` : "City"} error={!!errors.city} />
                        <Input color="green" size="lg" {...register("state")} label={!!errors.state ? `State - ${errors.state.message}` : "State"} error={!!errors.state} />
                        <Input color="green" size="lg" {...register("zipCode")} label={!!errors.zipCode ? `Postal code - ${errors.zipCode.message}` : "Postal code"} error={!!errors.zipCode} />
                        <Input color="green" size="lg" {...register("neighborhood")} label={!!errors.neighborhood ? `Neighborhood - ${errors.neighborhood.message}` : "Neighborhood"} error={!!errors.neighborhood} />
                    </div>
                </div>
            </div>

            <div className="w-full p-4 border-2 rounded-md">
                <Typography variant="h6" color="blue-gray">Observation</Typography>
                <div className="grid grid-cols-1 gap-2 mt-5 space-y-2">
                    <Textarea color="green" size="lg" {...register("observation")} label={!!errors.observation ? `Observation - ${errors.observation.message}` : "Observation"} error={!!errors.observation} />
                </div>
            </div>

            <div className="p-4 border-2 rounded-md">
                <Typography variant="h6" color="blue-gray">Responsables Information</Typography>
                <div className="grid grid-cols-1 gap-2 mt-5 space-y-2">
                    {student.responsibles?.map((_, index) => (
                        <div className="flex items-center space-x-2" key={index}>
                            <Input color="green" size="lg" {...register(`responsibles.${index}.name`)} label={!!errors.responsibles?.[index]?.name ? `Name - ${errors.responsibles?.[index]?.name?.message}` : "Name"} error={!!errors.responsibles?.[index]?.name} />
                            <Input color="green" size="lg" {...register(`responsibles.${index}.phone`)} label={!!errors.responsibles?.[index]?.phone ? `Phone - ${errors.responsibles?.[index]?.phone?.message}` : "Phone"} error={!!errors.responsibles?.[index]?.phone} />
                            <input className="hidden opacity-0" {...register(`responsibles.${index}.id`)} />
                        </div>
                    ))}
                </div>
            </div>
        </CardBody>
    )
}