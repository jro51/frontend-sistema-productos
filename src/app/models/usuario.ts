
export class Usuario {
    id!: number; 
    nombre: string;
    apellido: string;
    email: string;
    username: string;
    password?: string; 

    constructor() {
        this.nombre = '';
        this.apellido = '';
        this.email = '';
        this.username = '';
    }  
}