import { CardBody, CardFooter } from "@material-tailwind/react"



export const ClassesListSkeleton = () => {

    return (
        <>
            <CardBody>
                <div className="flex items-center justify-between">
                    <div className="w-24 h-8 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="hidden w-24 h-8 bg-gray-200 rounded-md animate-pulse lg:block"></div>
                    <div className="hidden w-24 h-8 bg-gray-200 rounded-md animate-pulse lg:block"></div>
                    <div className="hidden w-24 h-8 bg-gray-200 rounded-md animate-pulse lg:block"></div>
                    <div className="w-24 h-8 bg-gray-200 rounded-md animate-pulse"></div>
                </div>

                <div className="mt-2 space-y-1">
                    {Array.from({ length: 13 }).map((_, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="w-full bg-gray-200 rounded-md h-16 animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </CardBody>

            <CardFooter className="flex items-center justify-between">
                <div className="w-24 h-6 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="w-24 h-6 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="w-24 h-6 bg-gray-200 rounded-md animate-pulse"></div>
            </CardFooter>
        </>
    )
}