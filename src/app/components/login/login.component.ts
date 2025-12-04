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
    this.errorMessage = null; 

    console.log("--- onLogin ejecutado con CLICK. Usuario:", this.credentials.username);

    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        console.log("LOGIN EXITOSO:", response);
        const token = response.token; 
        
        if (token) {
          this.authService.saveToken(token);
          this.closeLogin.emit(); 
          window.location.reload(); 
        }
      },
      error: (err) => {
        console.error('ERROR EN LOGIN:', err); 
        this.errorMessage = err.error?.message || 'Credenciales inválidas. Intente de nuevo.';
      }
    });
  }

  onCancel(){
    this.credentials = {username: '', password: ''};
    this.closeLogin.emit();
  }
}
