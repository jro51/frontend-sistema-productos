
export class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    username: string;

    password?: string; 
    role: 'ADMIN' | 'USER'; 

    constructor(
        id: number = 0,
        nombre: string = '',
        apellido: string = '',
        email: string = '',
        username: string = '',
        role: 'ADMIN' | 'USER' = 'USER',
        password?: string
    ) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.username = username;
        this.role = role;
        this.password = password;
    } 
}