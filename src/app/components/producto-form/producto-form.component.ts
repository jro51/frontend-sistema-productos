import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Producto } from '../../models/producto';

@Component({
  selector: 'producto-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './producto-form.component.html'
})
export class ProductoFormComponent {
  @Input() producto: Producto = new Producto();

  @Output() newProductoEventEmitter = new EventEmitter();

  @Output() closeFormEventEmitter = new EventEmitter();

  @Output() newCloseModalAndReset = new EventEmitter();

  onSubmit(productoForm: NgForm):void{
    if(productoForm.valid){
      this.newProductoEventEmitter.emit(this.producto);
    }
  }

  clearForm(productoForm: NgForm):void{
    productoForm.reset();
    this.closeFormEventEmitter.emit();
  }

  closeModalAndReset(){
    this.newCloseModalAndReset.emit();
  }
}
