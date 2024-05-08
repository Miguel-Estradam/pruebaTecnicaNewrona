import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserLogin } from '../../interfaces/login.interface';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _authService = inject(AuthService);
  showPassword = false;
  submitInvalid = true;
  user: UserLogin = {
    email: '',
    password: '',
  };
  userForm: FormGroup;
  constructor() {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  // Función para validar que el formulario este completo
  async validateFormLogin() {
    this.submitInvalid = this.userForm.valid;
    if (this.userForm.valid) {
      const email = this.userForm.get('email')?.value;
      const password = this.userForm.get('password')?.value;
      await this._authService.login(email, password).then(() => {});
      this.submitInvalid = true;
    }
  }
}
