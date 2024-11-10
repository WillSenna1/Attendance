import { Teacher } from "@/models/teacher";
import { Avatar, CardBody, Chip, Input, Option, Select, Typography } from "@material-tailwind/react"

type StudentDetailsInformationProps = {
    teacher: Teacher;
    errors: any;
    register: any;
    watch: any;
    setValue: any;
}

export const TeacherDetailsInformation = ({ teacher, errors, register, watch, setValue }: StudentDetailsInformationProps) => {


    return (
        <CardBody className="flex flex-col gap-4 overflow-auto py-5 h-[calc(100vh-100px)] lg:h-[calc(100vh-450px)]">
            <div className="flex justify-between items-center border-2 p-4 rounded-md">
                <div className="flex items-center gap-4">
                    <Avatar src={teacher.user.imageUrl} alt={watch().name} size="xl" />
                    <div className="flex flex-col">
                        <Typography variant="h6" color="blue-gray" className="font-normal">{watch().name}</Typography>
                        <Typography variant="small" color="blue-gray" className="font-normal opacity-70">{watch().email}</Typography>
                    </div>
                </div>
                <div>
                    {teacher.user.onboardings?.[0]?.done ? <Chip size="sm" color="green" value="Completed" /> : <Chip color="blue-gray" size="sm" value="Pending" />}
                </div>
            </div>

            <div className="flex flex-col gap-2 justify-between lg:flex-row">
                <div className="border-2 p-4 rounded-md w-full">
                    <Typography variant="h6" color="blue-gray">Personal Information</Typography>
                    <div className="grid grid-cols-1 gap-2 mt-5 space-y-2">
                        <Input color="green" size="lg" {...register("name")} label={!!errors.name ? `Name - ${errors.name.message}` : "Name"} error={!!errors.name} />
                        <Input color="green" size="lg" type="email" {...register("email")} label={!!errors.email ? `Email - ${errors.email.message}` : "Email"} error={!!errors.email} />
                        <Input color="green" size="lg" {...register("phone")} label={!!errors.phone ? `Phone - ${errors.phone.message}` : "Phone"} error={!!errors.phone} />

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
                    </div>
                </div>

                <div className="border-2 p-4 rounded-md w-full">
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
        </CardBody>
    )
}