import { Usuario } from "./usuario";

export interface LoginResponse{
    access_token: string;
    email_usuario: string;
    expires_in: number;
    jti: string;
    nombre_usuario: string;
    refresh_token: string;
    scope: string;
    token_type: string;
}


export interface listaUsuariosResponse{
    estatus: number;
    mensaje: string;
    resultado: Usuario[];
    salt: string;
}