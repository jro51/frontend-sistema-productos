import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuario-form.component.html'
})
export class UsuarioFormComponent implements OnInit{
    @Input() usuario: Usuario = new Usuario();
    
    @Output() newUsuarioEventEmitter = new EventEmitter<Usuario>();
    
    @Output() closeFormEventEmitter = new EventEmitter<void>();
    
    @Output() newCloseModalAndReset = new EventEmitter<void>();
    
    ngOnInit(): void {
        if (this.usuario.id <= 0) {
            this.usuario.role = 'USER';
        }
    }

    onSubmit(usuarioForm: NgForm): void {
        if (usuarioForm.valid) {
            let usuarioAEnviar: Usuario = { ...this.usuario };

            if (usuarioAEnviar.id <= 0) {
                usuarioAEnviar.role = 'USER';
            } else {
                usuarioAEnviar.password = undefined; 
            }
  
            this.newUsuarioEventEmitter.emit(usuarioAEnviar);
        }
    }

    clearForm(usuarioForm: NgForm): void {
        usuarioForm.resetForm(); 
        
        this.usuario = new Usuario();
        this.usuario.role = 'USER';
        
        this.closeFormEventEmitter.emit();
    }

    closeModalAndReset(): void {
        this.newCloseModalAndReset.emit();
    }
}
