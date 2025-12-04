import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  }

  @Output() closeLogin = new EventEmitter<void>();
  errorMessage : string | null = null;

  constructor(private authService: AuthService){

  }

  onLogin(){
    console.log("¡Se hizo clic! Intentando login...");
    this.errorMessage = null; 

    console.log("--- onLogin ejecutado con CLICK. Usuario:", this.credentials.username);
    
    // ⚠️ Prueba de Depuración (Descomenta esto para ver si el método se ejecuta)
    // console.log("Ejecutando onLogin. Usuario:", this.credentials.username); 

    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        // Lógica de éxito: Si llegas aquí, el login fue CORRECTO.
        console.log("LOGIN EXITOSO:", response);
        const token = response.token; 
        
        if (token) {
          this.authService.saveToken(token);
          this.closeLogin.emit(); // Cierra el modal
          window.location.reload(); // Recarga la página para mostrar el contenido de Admin
        }
      },
      error: (err) => {
        // Lógica de error: Si llegas aquí, falló por 401 (Credenciales) o Red.
        console.error('ERROR EN LOGIN:', err); // ⚠️ MIRA ESTO EN LA CONSOLA
        
        // Muestra un mensaje al usuario
        this.errorMessage = err.error?.message || 'Credenciales inválidas. Intente de nuevo.';
      }
    });
  }

  onCancel(){
    this.credentials = {username: '', password: ''};
    this.closeLogin.emit();
  }
}
