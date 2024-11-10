import { useAuth } from "@/contexts/authProvider"
import { Card, CardBody, CardFooter, CardHeader, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react"
import { Chalkboard, ChalkboardTeacher, Gear, GraduationCap, GridFour, SignOut, Student } from "@phosphor-icons/react"
import { Link, useLocation } from "react-router-dom"

const data = [
    {
        title: 'Home',
        icon: <GridFour weight="fill" size={22} />,
        href: '/dashboard',
    },
    {
        title: 'Students',
        icon: <Student weight="fill" size={22} />,
        href: '/students'
    },
    {
        title: 'Teachers',
        icon: <ChalkboardTeacher weight="fill" size={22} />,
        href: '/teachers'
    },
    {
        title: 'Classes',
        icon: <GraduationCap weight="fill" size={22} />,
        href: '/classes'
    },
    {
        title: 'Lessons',
        icon: <Chalkboard weight="fill" size={22} />,
        href: '/lessons'
    }
]

export const Sidebar = () => {
    const location = useLocation()
    const { logOut } = useAuth()

    return (
        <Card className="h-screen rounded-l-none overflow-auto w-72">
            <CardHeader className="rounded-none text-center bg-transparent" floated={false} shadow={false}>
                <Typography color="green" variant="h4">Attendence</Typography>
            </CardHeader>

            <CardBody className="px-4">
                <List className="p-0">
                    {data.map((item, index) => {
                        const isSelected = location.pathname === item.href

                        return (
                            <Link to={item.href} key={index}>
                                <ListItem selected={isSelected} itemID={item.title}>
                                    <ListItemPrefix >{item.icon}</ListItemPrefix>
                                    <Typography variant="small" className="font-medium">{item.title}</Typography>
                                </ListItem>
                            </Link>
                        )
                    })}
                </List>
            </CardBody>
            <CardFooter className="mt-auto px-4">
                <List className="p-0">
                    <Link to="/settings">
                        <ListItem selected={location.pathname === "/settings"}>
                            <ListItemPrefix><Gear weight="fill" size={22} /></ListItemPrefix>
                            <Typography variant="small" className="font-medium">Settings</Typography>
                        </ListItem>
                    </Link>


                    <ListItem onClick={() => logOut()}>
                        <ListItemPrefix><SignOut weight="fill" size={22} /></ListItemPrefix>
                        <Typography variant="small" className="font-medium">Sign out</Typography>
                    </ListItem>
                </List>
            </CardFooter>
        </Card>
    )
}