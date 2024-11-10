import { api } from "../client-api";
import { AuthLoginRequest, AuthLoginResponse } from "./dtos/auth-login-dto";
import { AuthRefreshTokenRequest, AuthRefreshTokenResponse } from "./dtos/auth-refresh-token-dto";



const Login = async ({ email, password }: AuthLoginRequest) => {
    const response = await api.post("auth/login", { json: { email, password } }).json<AuthLoginResponse>();

    return response;
}


const RefreshToken = async ({ token }: AuthRefreshTokenRequest) => {
    const response = await api.post("auth/refresh-token", { json: { token } }).json<AuthRefreshTokenResponse>();

    return response;
}

export const AuthService = () => { return { Login, RefreshToken } }