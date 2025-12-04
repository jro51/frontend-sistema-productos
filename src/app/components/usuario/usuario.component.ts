import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [UsuarioFormComponent, CommonModule],
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit{

    usuarios: Usuario[] = [];
    selectUsuario: Usuario = new Usuario();
    showForm: boolean = false; 

    constructor(private usuarioService: UsuarioService) { }

    ngOnInit(): void {
        this.loadUsuarios(); 
    }

    loadUsuarios(): void {
        this.usuarioService.findAll().subscribe({
            next: (data) => {
                this.usuarios = data;
            },
            error: (err) => {
                console.error("Error al cargar usuarios:", err);
            }
        });
    }

    openForm() {
        this.selectUsuario = new Usuario(); 
        this.showForm = true;
    }

    closeModalAndReset() {
        this.showForm = false;
        this.selectUsuario = new Usuario();
    }

    addUsuario(usuario: Usuario): void {
        if (usuario.id > 0) {
            this.updateUsuario(usuario);
            return;
        }

        this.usuarioService.create(usuario).subscribe(
            newUsuario => {
                this.usuarios = [...this.usuarios, newUsuario];
                this.closeModalAndReset();
                console.log('Usuario creado con éxito:', newUsuario);
            }
        );
    }

    selectUsuarioEdit(usuario: Usuario): void {
        this.selectUsuario = { ...usuario }; 
        this.selectUsuario.password = undefined; 
        this.showForm = true;
    }

    updateUsuario(usuario: Usuario): void {
        this.usuarioService.update(usuario).subscribe(updUsuario => {
            this.usuarios = this.usuarios.map(u => 
                u.id === updUsuario.id ? updUsuario : u
            );
            this.closeModalAndReset();
            console.log('Usuario actualizado con éxito:', updUsuario);
        });
    }

    deleteUsuario(id: number): void {
        if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            this.usuarioService.delete(id).subscribe(() => {
                this.usuarios = this.usuarios.filter(u => u.id !== id);
                console.log(`Usuario con ID ${id} eliminado.`);
            });
        }
    }

    
}
