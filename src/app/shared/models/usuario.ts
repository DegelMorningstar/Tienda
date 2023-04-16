export class Usuario implements IUsuario{
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    verificado: boolean;
    createAt: string;
    updateAt: string;
    roles: Role[];

    constructor(id: number, nombre: string, apellidos: string, email: string, password: string, verificado: boolean, createAt: string, updateAt: string, roles: Role[]) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
        this.verificado = verificado;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.roles = roles;
    }

    public getNombreCompleto(): string {
        return this.nombre + ' ' + this.apellidos;
    }
    public getRole(): string {
        return this.roles[0].nombre;
    }
}

export interface IUsuario {
    id?: number;
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    verificado?: boolean;
    createAt?: string;
    updateAt?: string;
    roles?: Role[];
}

export interface Role {
    id: number;
    nombre: string;
}
