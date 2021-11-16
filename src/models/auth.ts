export interface Login {
    email: string,
    password: string,
}

export interface Register extends Login {
    token: string
}

export interface AccessToken {
    access_token: string
    access_token_expires: string
}

export interface RefreshToken extends AccessToken {
    refresh_token: string
    refresh_token_expires: string
}