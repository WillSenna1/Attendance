import { LessonService } from "@/api/lessons"
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from "@material-tailwind/react"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { debounce } from "lodash"
import { useState } from "react"
import { LessonsCreate } from "../create/index"
import { LessonListSkeleton } from "./skeletron"


export const LessonList = () => {
    const { FindAllPaginated } = LessonService()
    const [pagination, setPagination] = useState({ page: 1, perPage: 10 })
    const [search, setSearch] = useState("")
    const { data, isLoading } = useQuery({ queryKey: ['lessons', pagination.page, pagination.perPage, search], queryFn: () => FindAllPaginated({ page: pagination.page, perPage: pagination.perPage, search }) })


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
        <Card className="h-full mt-10 bg-transparent shadow-none">
            <CardHeader floated={false} shadow={false} className="flex items-center justify-between bg-transparent rounded-none">
                <div className="bg-white w-96">
                    <Input onChange={(e) => debouncedSearch(e.target.value)} size="lg" color="green" type="text" label="Search for lessons" />
                </div>

                <LessonsCreate />
            </CardHeader>

            {isLoading ? (
                <LessonListSkeleton />
            ) : (
                <CardBody className="grid grid-cols-1 gap-4 mt-10 lg:grid-cols-4">
                    {data?.data.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-10 bg-white border rounded-lg shadow-sm cursor-pointer border-blue-gray-50 hover:shadow-lg hover:bg-gray-100">
                            <div>
                                <Typography variant="h6" className="font-medium">{item.name}</Typography>
                            </div>
                        </div>
                    ))}
                </CardBody>
            )}

            {!isLoading && (
                <CardFooter className="flex items-center justify-between mt-auto">
                    <Button onClick={() => handlePrevPage()} disabled={!data?.meta?.prev} size="sm" variant="text" color="green" className="flex items-center justify-center gap-2"><CaretLeft /> Back</Button>
                    <Typography color="gray" className="text-xs"> Page {data?.meta?.currentPage} of {data?.meta?.lastPage} | Total {data?.meta?.total}</Typography>
                    <Button onClick={() => handleNextPage()} disabled={!data?.meta?.next} size="sm" variant="text" color="green" className="flex items-center justify-center gap-2">Next <CaretRight /></Button>
                </CardFooter>
            )}

        </Card>
    )
}