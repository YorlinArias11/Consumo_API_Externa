import { Component, OnInit, inject } from '@angular/core';
import { ProductoService } from '../../services/http/producto.service';
import { CategoryInterface, ProductoInterface } from '../../interfaces/producto-interface';
import { NgOptimizedImage } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [NgOptimizedImage, RouterOutlet, FormsModule],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  private readonly _productoHttp = inject(ProductoService);
  producto: ProductoInterface[] = [];
  categoria: CategoryInterface[] = [];
  OpenModalAdd = false;
  OpenModalUpdate = false;

  //Variables para agregar un nuevo producto
  Newtitle : string = '';
  Newprice: number = 0.0;
  Newdescription: string = '';
  Newcategory: number = 0;
  Newimage: string = '';

  //Variables para actualizar un producto existente
  UpdateId: number | null = null;
  Updatetitle: string = '';
  Updateprice: number = 0.0;
  Updatedescription: string = '';
  Updatecategory: number = 0;
  Updateimage: string = '';

  ngOnInit(): void {
    this._productoHttp.getProducto().subscribe(
      (res: ProductoInterface[]) => {
        this.producto = res;
      }
    );
    this.getCategorias();
  }

  getCategorias() {
    this._productoHttp.getCategorias().subscribe(
      (res: CategoryInterface[]) => {
        this.categoria = res;
      }
    )
  }

  openModalAdd(): void {
    this.OpenModalAdd = true;
  }

  closeModalAdd(): void {
    this.OpenModalAdd = false;
  }

  openModalUpdate(producto: ProductoInterface): void {
    this.UpdateId = producto.id;
    this.Updatetitle = producto.title;
    this.Updateprice = producto.price;
    this.Updatedescription = producto.description;
    this.Updatecategory = producto.category.id;
    this.Updateimage = producto.images[0];
    this.OpenModalUpdate = true;
  }

  closeModalUpdate(): void {
    this.OpenModalUpdate = false;
  }

  resetForm() {
    this.Newtitle = '';
    this.Newprice = 0;
    this.Newdescription = '';
    this.Newcategory = 0;
    this.Newimage = '';
  }


  addProduct(){
    this._productoHttp.addProducto(this.Newtitle, this.Newprice, this.Newdescription, this.Newcategory, [this.Newimage]).subscribe(
      (res: ProductoInterface) => {
        console.log('Producto agregado:', res);
        this.ngOnInit(); // Actualizar la lista de productos después de agregar uno nuevo
        alert('Producto agregado exitosamente');
      },
      error => {
        console.error('Error al agregar el producto:', error);
        if (error.error) {
          alert(`Error al agregar el producto: ${error.error.message || error.error}`); // Mostrar mensaje de error más detallado
        } else {
          alert(`Error al agregar el producto: ${error.message}`);
        }
      }
    );
    this.resetForm();
    this.OpenModalAdd = false; // Cerrar el modal después de actualizar el producto
  }

  updateProduct() {
    if (this.UpdateId !== null) {
      this._productoHttp.actualizarProducto(this.UpdateId, this.Updatetitle, this.Updateprice, this.Updatedescription).subscribe(
        (res: ProductoInterface) => {
          console.log('Producto actualizado:', res);
          this.ngOnInit(); // Actualizar la lista de productos después de la actualización
          alert('Producto actualizado exitosamente');
        },
        error => {
          console.error('Error al actualizar el producto:', error);
          alert(`Error al actualizar el producto: ${error.message}`);
        }
      );

      this.OpenModalUpdate = false; // Cerrar el modal después de actualizar el producto
    }
  }

  deleteProduct(producto: ProductoInterface) {

    console.log('Eliminar producto', producto);

    const confirmation = confirm(`¿Estás seguro de que quieres eliminar el producto: ${producto.title}?`);

    if (confirmation) {
      this._productoHttp.eliminarProducto(producto.id).subscribe(
        () => {
          console.log('Producto eliminado:', producto);
          this.ngOnInit(); // Actualizar la lista de productos después de eliminar uno
          alert('Producto eliminado exitosamente');
        },
        error => {
          console.error('Error al eliminar el producto:', error);
          alert(`Error al eliminar el producto: ${error.message}`); // Mostrar un mensaje de alerta con el error
        }
      );
    } else {
      console.log('Eliminación cancelada');
      alert('Eliminación cancelada');
    }
  }
}