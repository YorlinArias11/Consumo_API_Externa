import { Component, inject } from '@angular/core';
import { ProductoService } from '../../services/http/producto.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {



  private readonly _http = inject(ProductoService);

  //Variables para loguearse
  email: string = "";
  password: string = "";

  constructor(public route: Router, private fm: FormBuilder) { }

  resetForm() {
    this.email = '',
      this.password = ''
  }
  formulario = this.fm.group({
    validarE: ['', Validators.required],
    validarP: ['', Validators.required]
  })
  get validarE() {
    return this.formulario.get("validarE") as FormControl
  }
  get validarP() {
    return this.formulario.get("validarP") as FormControl
  }
  loguear() {
    this._http.getToken(this.email, this.password).subscribe((res: any) => {
      console.log(res);
      localStorage.setItem("token", res["access_token"]);
      alert("Logueado exitosamente");
      this.route.navigateByUrl("/producto");
    },
      (error) => {
        console.error(error);
        alert("Los datos son incorrectos, verifica tú email y contraseña");
        this.resetForm();
      }
    );
  }
}