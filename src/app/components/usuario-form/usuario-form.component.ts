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
export class UsuarioFormComponent{
    @Input() usuario: Usuario = new Usuario();
    
    @Output() newUsuarioEventEmitter = new EventEmitter<Usuario>();
    
    @Output() closeFormEventEmitter = new EventEmitter<void>();
    
    @Output() newCloseModalAndReset = new EventEmitter<void>();

    onSubmit(usuarioForm: NgForm): void {
        if (usuarioForm.valid) {
            this.newUsuarioEventEmitter.emit(this.usuario);
        }
    }

    clearForm(usuarioForm: NgForm): void {
        usuarioForm.resetForm(); 
        
        this.usuario = new Usuario();
        
        this.closeFormEventEmitter.emit();
    }

    closeModalAndReset(): void {
        this.newCloseModalAndReset.emit();
    }
}
