export interface Credentials {
    email: string,
    password: string
}

export interface ConfirmEmail {
    email: string,
    code: string
}

export interface ChangePassword {
    password: string,
    confirmPassword: string
}

export type ResponseError = {
    data: {
        message?: string;
        error?: string;
        statusCode?: number;
    },
    status: number;
}
