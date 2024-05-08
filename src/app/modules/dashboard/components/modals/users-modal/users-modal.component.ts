import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './users-modal.component.html',
  styleUrl: './users-modal.component.scss',
})
export class UsersModalComponent {
  private _userService = inject(UserService);
  @Output() changeModal = new EventEmitter<boolean>();
  @Input() showModal = false;
  showPassword = false;
  @Input() user = {
    name: '',
    email: '',
    password: '',
  };
  userForm: FormGroup;
  submitInvalid = true;
  constructor() {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onClose() {
    // this.showPopUp = false;
    this.changeModal.emit(false);
  }
  async validateFormWorker() {
    this.submitInvalid = this.userForm.valid;
    if (this.userForm.valid) {
      await this._userService.createUser(this.userForm.value).then(() => {
        this.userForm.reset();
        this.onClose();
      });
    }
  }
}
