import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { UsuarioFormComponent } from "./usuario-form/usuario-form.component";
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'producto',
  standalone: true,
  imports: [CommonModule, ProductoFormComponent, LoginComponent, UsuarioFormComponent],
  templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit{

  productos: Producto[] = [];
  selectProducto : Producto = new Producto();
  showForm: boolean = false;

  usuarios: Usuario[] = []; 
  selectUsuario: Usuario = new Usuario(); 
  showFormUsuario: boolean = false;

  isSidebarOpen: boolean = true;
  showLoginModal: boolean = false;

  vista: 'productos' | 'usuarios' = 'productos';

  constructor(private service : ProductoService, public authService: AuthService, private usuarioService: UsuarioService){

  }

  ngOnInit(): void {
    this.loadProductos();
    //this.service.findAll().subscribe(producto => this.productos = producto);
  }

  loadProductos(): void {
    this.service.findAll().subscribe({
        next: (data) => {
            this.productos = data;
        },
        error: (err) => {
            console.error("Error al cargar productos:", err);
        }
    });
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

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  openForm() {
    this.selectProducto = new Producto(); 
    this.showForm = true;
  }

  closeModalAndReset() {
    this.showForm = false;
    this.selectProducto = new Producto();
  }

  addProducto(producto : Producto){
    if(producto.id > 0){
      this.updateProducto(producto);
      return;
    }
    this.service.create(producto).subscribe(
      newProducto => {
        this.productos = [... this.productos, newProducto];
        this.selectProducto = new Producto();
        this.showForm = false;
      }
    );
  }

  selectProductoEdit(producto : Producto){
    this.selectProducto = {...producto};
    this.showForm = true;
  }

  updateProducto(producto: Producto):void{
    this.service.update(producto).subscribe(updProducto => {
      this.productos = this.productos.map(p => 
        p.id === updProducto.id ? updProducto : p
      )
      this.selectProducto = new Producto();
      this.showForm = false;
    });
  }

  deleteProducto(id : number):void{
    this.service.delete(id).subscribe(() => {
      this.productos = this.productos.filter( p => {
        p.id !== id;
      });
    })
  }

  openLogin() {
    this.showLoginModal = true;
  }

  closeLogin() {
    this.showLoginModal = false;
  }
  
  logout() {
    this.authService.logout();
  }
  
  seleccionarVista(nuevaVista: 'productos' | 'usuarios'): void {
        this.vista = nuevaVista;
        this.showForm = false; 
        this.showFormUsuario = false;

        if (nuevaVista === 'productos') {
            this.loadProductos(); 
        } else if (nuevaVista === 'usuarios' && this.authService.isAuthenticated()){ 
            this.loadUsuarios();
        }
    }

  addToCart(producto: any): void {
    console.log(`Producto añadido al carrito: ${producto.nombre}`);
    // alert(`¡${producto.nombre} añadido al carrito!`);
    alert('Aun falta implementar');
  }

  openFormUsuario() {
      this.selectUsuario = new Usuario(); 
      this.showFormUsuario = true;
  }

    closeModalAndResetUsuario() {
        this.showFormUsuario = false;
        this.selectUsuario = new Usuario();
    }

    addUsuario(usuario: Usuario): void {
    if (usuario.id > 0) {
        this.updateUsuario(usuario);
        return;
    }

    console.log('Datos a enviar al backend:', usuario);
    
    this.usuarioService.create(usuario).subscribe({
        next: (newUsuario) => {
            console.log('Usuario creado exitosamente:', newUsuario);
            this.usuarios = [...this.usuarios, newUsuario];
            this.closeModalAndResetUsuario();
        },
        error: (err) => {
            console.error('Error al crear usuario:', err);
            
            if (err.status === 403) {
                alert('Error 403: No tienes permisos para crear usuarios. Verifica que estés autenticado como ADMIN.');
            } else if (err.status === 401) {
                alert('Error 401: Tu sesión expiró. Vuelve a iniciar sesión.');
            } else {
                alert('Error al crear usuario: ' + (err.error?.message || err.message));
            }
        }
    });
}

    selectUsuarioEdit(usuario: Usuario): void {
        this.selectUsuario = {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        username: usuario.username
        // NO incluir password
        };
        this.showFormUsuario = true;
    }

    updateUsuario(usuario: Usuario): void {
        if (!usuario.id) {
            console.error('Error: Usuario sin ID');
            return;
        }

        this.usuarioService.update(usuario).subscribe({
            next: (updUsuario) => {
                this.usuarios = this.usuarios.map(u => 
                    u.id === updUsuario.id ? updUsuario : u
                );
                this.closeModalAndResetUsuario();
                console.log('Usuario actualizado con éxito:', updUsuario);
            },
            error: (err) => {
                console.error('Error al actualizar usuario:', err);
                alert('Error al actualizar usuario: ' + (err.error?.message || err.message));
            }
        });
    }

    deleteUsuario(id: number): void {
        if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
            this.usuarioService.delete(id).subscribe(() => {
                this.usuarios = this.usuarios.filter(u => u.id !== id);
            });
        }
    }
}
