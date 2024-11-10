import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../contexts/authProvider"
import { Sidebar } from "@/components/sidebar";


export const AppLayout = () => {
    const { isAuthenticated, user } = useAuth();
    
    if (!isAuthenticated) return (<Navigate to="/auth/login" />);
    if (!user?.onboardings?.[0]?.done) return (<Navigate to="/onboarding/" />);
    
    return (
        <div className="flex justify-center items-center h-screen w-full bg-gray-100">
            <Sidebar />

            <div className="flex-1 h-screen overflow-x-hidden overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}