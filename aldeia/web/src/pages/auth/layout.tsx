import { useAuth } from "@/contexts/authProvider"
import { Navigate, Outlet } from "react-router-dom"


export const AuthLayout = () => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) return (<Navigate to="/dashboard" />);

    return (
        <div className="flex h-screen justify-center items-center">
            <Outlet />
        </div>
    )
}