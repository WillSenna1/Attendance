import { Typography } from "@material-tailwind/react"
import { LessonList } from "./list"

export const LessonsPage = () => {


    return (
        <div className="flex flex-col h-full p-10">
            <header >
                <Typography variant="h5" className="font-medium">Lessons</Typography>
            </header>


            <main className="flex-1 mt-10">
                <LessonList />
            </main>
        </div>
    )
}