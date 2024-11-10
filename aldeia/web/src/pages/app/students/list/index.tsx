import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from "@material-tailwind/react";
import { StudentListTable } from "./table";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { StudentListSkeleton } from "./skeletron";
import { useState } from "react";
import { StudentCreate } from "../create";
import { debounce } from 'lodash';
import { StudentService } from "@/api/students";


export const StudentList = () => {
    const [pagination, setPagination] = useState({ page: 1, perPage: 10 })
    const { FindAllPaginated } = StudentService()
    const [search, setSearch] = useState("")
    const { data, isLoading } = useQuery({ queryKey: ["students", pagination.page, pagination.perPage, search], queryFn: () => FindAllPaginated({ page: pagination.page, perPage: pagination.perPage, search }) })

    const handleNextPage = () => {
        setPagination({ ...pagination, page: pagination.page + 1 })
    }
    const handlePrevPage = () => {
        setPagination({ ...pagination, page: pagination.page - 1 })
    }

    const debouncedSearch = debounce((value: string) => {
        setSearch(value.trim());
        setPagination({ ...pagination, page: 1 })
    }, 1000);

    return (
        <Card>
            <CardHeader className="flex justify-between p-2" floated={false} shadow={false}>
                <div className="w-96">
                    <Input label="Search" color="green" onChange={(e) => debouncedSearch(e.target.value)} />
                </div>
                <StudentCreate />
            </CardHeader>

            {isLoading ? (
                <StudentListSkeleton />
            ) : (
                <>
                    <CardBody>
                        <StudentListTable data={data?.data} />
                    </CardBody>

                    <CardFooter className="flex justify-between items-center">
                        <Button onClick={() => handlePrevPage()} disabled={!data?.meta?.prev} size="sm" variant="text" color="green" className="flex items-center justify-center gap-2"><CaretLeft /> Back</Button>
                        <Typography color="gray" className="text-xs"> Page {data?.meta?.currentPage} of {data?.meta?.lastPage} | Total {data?.meta?.total}</Typography>
                        <Button onClick={() => handleNextPage()} disabled={!data?.meta?.next} size="sm" variant="text" color="green" className="flex items-center justify-center gap-2">Next <CaretRight /></Button>
                    </CardFooter>
                </>
            )}
        </Card >
    )
}