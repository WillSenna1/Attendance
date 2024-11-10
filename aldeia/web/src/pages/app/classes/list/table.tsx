import { Typography } from "@material-tailwind/react";
import { Classe } from "@/models/classe";
import { ClassesDelete } from "../delete";
import { ClassesDetails } from "../details";

type ClassesListTableProps = {
    data: Classe[] | undefined;
}

export const ClassesListTable = ({ data }: ClassesListTableProps) => {

    return (
        <table className="w-full min-w-max table-auto">
            <thead>
                <tr className="bg-blue-gray-50">
                    <th className="p-4 text-left">
                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Name</Typography>
                    </th>

                     <th className="p-4 text-left hidden lg:table-cell">
                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Total Students</Typography>
                    </th>

                     <th className="p-4 text-left hidden lg:table-cell">
                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Total Teachers</Typography>
                    </th>

                     <th className="p-4 text-left hidden lg:table-cell">
                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Total Lessons</Typography>
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
                            <Typography variant="small" color="blue-gray" className="font-normal"> {data.name}</Typography>
                        </td>

                        <td className="p-4 hidden lg:table-cell">
                            <Typography variant="small" color="blue-gray" className="font-normal"> {data._count.students}</Typography>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                            <Typography variant="small" color="blue-gray" className="font-normal">{data._count.teachers}</Typography>
                        </td>
                        <td className="p-4 hidden lg:table-cell ">
                            <Typography variant="small" color="blue-gray" className="font-normal">{data._count.lessons}</Typography>
                        </td>

                        <td className="flex p-4 justify-end space-x-2">
                            <ClassesDetails classe={data} />
                            <ClassesDelete classe={data} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}