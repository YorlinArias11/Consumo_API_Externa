import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryInterface, ProductoInterface } from '../../interfaces/producto-interface';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private readonly _http = inject(HttpClient);

  constructor() { }

  // Método para traer los producto
  getProducto():Observable<ProductoInterface[]> {
    return this._http.get<ProductoInterface[]>(`${environment.api}/products`);
  }

  // Método para traer las categorías
  getCategorias(): Observable<CategoryInterface[]> {
    return this._http.get<CategoryInterface[]>(`${environment.api}/categories`);
  }

  /*// Método para agregar un producto
  addProducto(producto: ProductoInterface): Observable<ProductoInterface> {
    return this._http.post<ProductoInterface>(`${environment.api}/products/`, producto);
  }*/

  addProducto(title: string, price: number, description: string, category: number, images: string[]): Observable<ProductoInterface> {
    return this._http.post<ProductoInterface>(`${environment.api}/products/`, {
      "title": title, "price": price, "description": description, "categoryId": category, images: images
    });
  }

  /*//Método para actualizar un producto
  actualizarProducto(producto: ProductoInterface): Observable<ProductoInterface> {
    return this._http.put<ProductoInterface>(`${environment.api}/products/${producto.id}`, producto);
  }*/

  //Método para actualizar un producto
  actualizarProducto(id: number, title: string, price: number, description: string): 
  Observable<ProductoInterface> {
    return this._http.put<ProductoInterface>(`${environment.api}/products/${id}`, {
      "title": title, "price": price, "description": description
    });
  }
  

  // Método para eliminar un producto
  eliminarProducto(id: number): Observable<void> {
    return this._http.delete<void>(`${environment.api}/products/${id}`);
  }

  getToken(email: string, password: string){
    return this._http.post(`${environment.api}/auth/login`,{
      "email": email, //john@mail.com
      "password": password //changeme
    });
  }
}