import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-restore-password',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './restore-password.component.html',
  styleUrl: './restore-password.component.scss',
})
export class RestorePasswordComponent {
  private _authService = inject(AuthService);
  showPassword = false;
  submitInvalid = true;

  userForm: FormGroup;
  constructor() {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }
  // Función para validar que el formulario este completo
  async validateFormLogin() {
    this.submitInvalid = this.userForm.valid;
    if (this.userForm.valid) {
      const email = this.userForm.get('email')?.value;
      await this._authService.restorePassword(email).then(() => {});
      this.submitInvalid = true;
    }
  }
}
