import { Typography } from "@material-tailwind/react"
import { StudentList } from "./list"


export const StudentsPage = () => {


    return (
        <div className="p-10">
            <header>
                <Typography variant="h5" className="font-medium">Students</Typography>
            </header>

            <main className="mt-10">
                <StudentList  />
            </main>
        </div>
    )
}