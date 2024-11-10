import { Avatar, Typography } from "@material-tailwind/react";
import { StudentDelete } from "../delete";
import { Student } from "@/models/student";
import { StudentDetails } from "../details";

type StudentListTableProps = {
    data: Student[] | undefined;
}

export const StudentListTable = ({ data }: StudentListTableProps) => {

    return (
        <table className="w-full min-w-max table-auto">
            <thead>
                <tr className="bg-blue-gray-50">
                    <th className="p-4 text-left">
                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Student</Typography>
                    </th>
                    <th className="p-4 text-left hidden lg:table-cell">
                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Phone</Typography>
                    </th>
                    <th className="p-4 text-left hidden lg:table-cell">
                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">CPF</Typography>
                    </th>
                    <th className="p-4 text-left hidden lg:table-cell">
                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">RG</Typography>
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
                                <Avatar src={data.imageUrl} alt={data.name} size="sm" />
                                <div className="flex flex-col">
                                    <Typography variant="small" color="blue-gray" className="font-normal">{data.name}</Typography>
                                    <Typography variant="small" color="blue-gray" className="font-normal opacity-70">{data.email}</Typography>
                                </div>
                            </div>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                            <Typography variant="small" color="blue-gray" className="font-normal"> {data.phone}</Typography>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                            <Typography variant="small" color="blue-gray" className="font-normal">{data.cpf}</Typography>
                        </td>
                        <td className="p-4 hidden lg:table-cell ">
                            <Typography variant="small" color="blue-gray" className="font-normal">{data.rg}</Typography>
                        </td>
                        <td className="flex p-4 justify-end space-x-2">
                            <StudentDetails student={data} />
                            <StudentDelete student={data} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}