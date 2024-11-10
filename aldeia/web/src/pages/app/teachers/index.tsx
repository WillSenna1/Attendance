import { Typography } from "@material-tailwind/react"
import { Teacherlist } from "./list"


export const TeacherPage = () => {
    return (
        <div className="p-10">
            <header>
                <Typography variant="h5" className="font-medium">Teachers</Typography>
            </header>

            <main className="mt-10">
                <Teacherlist />
            </main>
        </div>
    )
}