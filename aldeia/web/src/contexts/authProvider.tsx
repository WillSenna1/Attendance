import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../models/user";
import { userService } from "../api/users";


type AuthContextData = {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    user: User;
    logOut: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { GetMe } = userService();
    const tokens = localStorage.getItem('tokens');
    const [isAuthenticated, setIsAuthenticated] = useState(!!tokens);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    const logOut = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        setUser({});
        window.location.href = '/auth/login';
    }

    useEffect(() => {
        (async () => {
            if (isAuthenticated) {
                setLoading(true);
                await GetMe()
                    .then((response) => {
                        setUser(response);
                    }).catch(() => {
                        logOut();
                    }).finally(() => {
                        setLoading(false);
                    });
            } else {
                setLoading(false);
            }
        })()
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logOut, user: user as User }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    )
};