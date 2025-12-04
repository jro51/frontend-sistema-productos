import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  create(usuario: Usuario): Observable<Usuario> {
    const usuarioParaCrear = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      username: usuario.username,
      password: usuario.password
    };
    return this.http.post<Usuario>(this.apiUrl, usuarioParaCrear);
  }

  update(usuario: Usuario): Observable<Usuario> {
    const usuarioParaActualizar = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      username: usuario.username
      // Password no en update
    };
    
    return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuarioParaActualizar);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
