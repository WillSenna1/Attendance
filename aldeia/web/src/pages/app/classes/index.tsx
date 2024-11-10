import { Typography } from "@material-tailwind/react"
import { ClassesList } from "./list"



export const ClassesPage = () => {


    return (
        <div className="p-10">
            <header>
                <Typography variant="h5" className="font-medium">Classes</Typography>
            </header>

            <main className="mt-10">
                <ClassesList />
            </main>
        </div>
    )
}