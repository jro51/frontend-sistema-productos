import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  producto!: Producto;

  constructor(private http : HttpClient) { }

  findAll(): Observable<Producto[]>{
    return this.http.get<Producto[]>('http://localhost:8080/api/productos');
  }

  create(producto : Producto): Observable<Producto>{
    return this.http.post<Producto>('http://localhost:8080/api/productos', producto);
  }

  update(producto : Producto): Observable<Producto>{
    return this.http.put<Producto>('http://localhost:8080/api/productos' + '/' + producto.id, producto);
  }

  delete(id : number): Observable<void>{
    return this.http.delete<void>('http://localhost:8080/api/productos'+ '/' + id);
  }
}
