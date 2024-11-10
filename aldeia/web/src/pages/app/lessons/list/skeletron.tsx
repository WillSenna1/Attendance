import { CardBody } from "@material-tailwind/react"



export const LessonListSkeleton = () => {

    return (
        <>
            <CardBody className="grid grid-cols-1 gap-4 mt-10 lg:grid-cols-4">
                {Array.from({ length: 13 }).map((_, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="w-full h-40 bg-gray-200 rounded-md animate-pulse"></div>
                    </div>
                ))}
            </CardBody>
        </>
    )
}