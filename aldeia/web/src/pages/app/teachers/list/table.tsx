import { Avatar, Chip, IconButton, Typography } from "@material-tailwind/react";
import { TeacherDelete } from "../delete";
import { Teacher } from "@/models/teacher";
import { TeacherDetails } from "../details";
import { TeacherService } from "@/api/teachers";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserSwitch } from "@phosphor-icons/react";

type TeacherListTableProps = {
    data: Teacher[] | undefined;
}

export const TeacherListTable = ({ data }: TeacherListTableProps) => {
    const { ResetOnboarding } = TeacherService();
    const query = useQueryClient();

    const handleResetOnboarding = async (teacher: Teacher) => {
        if (!teacher.user.onboardings?.[0]?.done) return toast.error("Onboarding already pending");

        await ResetOnboarding(teacher.id).then(() => {
            toast.success("Onboarding reset successfully");
        }).catch(() => {
            toast.error("Failed to reset onboarding");
        });

        query.invalidateQueries();
    }

    return (
        <table className="w-full min-w-max table-auto">
            <thead>
                <tr className="bg-blue-gray-50">
                    <th className="p-4 text-left">
                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Teacher</Typography>
                    </th>
                    <th className="p-4 text-left hidden lg:table-cell">
                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Phone</Typography>
                    </th>
                    <th className="p-4 text-left hidden lg:table-cell">
                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Onboarding</Typography>
                    </th>
                    <th className="p-4 text-right">
                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Actions</Typography>
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y">
                {data?.map((data, index) => (
                    <tr key={index}>
                        <td className="p-4">
                            <div className="flex items-center gap-3">
                                <Avatar src={data.user.imageUrl} alt={data.user.name} size="sm" />
                                <div className="flex flex-col">
                                    <Typography variant="small" color="blue-gray" className="font-normal">{data.user.name}</Typography>
                                    <Typography variant="small" color="blue-gray" className="font-normal opacity-70">{data.user.email}</Typography>
                                </div>
                            </div>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                            <Typography variant="small" color="blue-gray" className="font-normal"> {data.user.phone}</Typography>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                            <div className="flex">
                                {data.user.onboardings?.[0]?.done ? <Chip size="sm" color="green" value="Completed" /> : <Chip color="blue-gray" size="sm" value="Pending" />}
                            </div>
                        </td>
                        <td className="flex p-4 justify-end space-x-2">
                            <TeacherDetails teacher={data} />
                            <IconButton onClick={() => handleResetOnboarding(data)} size="sm" variant="text"><UserSwitch size={18} weight="duotone" /></IconButton>
                            <TeacherDelete teacher={data} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}