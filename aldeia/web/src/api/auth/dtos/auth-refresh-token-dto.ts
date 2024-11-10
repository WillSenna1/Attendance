

export interface AuthRefreshTokenRequest {
    token: string
}

export interface AuthRefreshTokenResponse {
    access_token: string;
    refresh_token: string;
}