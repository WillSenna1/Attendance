import { useAuth } from "@/contexts/authProvider"
import { Navigate, Outlet } from "react-router-dom"


export const OnboardingLayout = () => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) return (<Navigate to="/auth/login" />);
    if (user?.onboardings?.[0].done) return (<Navigate to="/dashboard" />);

    return (
        <div className="bg-gray-100">
            <Outlet />
        </div>
    )
}