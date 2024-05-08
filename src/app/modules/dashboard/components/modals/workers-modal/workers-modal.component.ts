import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { WorkersService } from '../../../services/workers.service';
import { NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Worker } from '../../../interfaces/workers.interface';

@Component({
  selector: 'app-workers-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './workers-modal.component.html',
  styleUrl: './workers-modal.component.scss',
})
export class WorkersModalComponent implements OnInit, OnChanges {
  private _workersServises = inject(WorkersService);
  @Output() changeModal = new EventEmitter<boolean>();
  @Input() showModal = false;
  @Input() toEdit = false;
  @Input() worker: Worker = {
    id: '',
    name: '',
    cedula: '',
  };
  workerForm: FormGroup;
  submitInvalid = true;
  constructor() {
    this.workerForm = new FormGroup({
      name: new FormControl(this.worker.name, [Validators.required]),
      cedula: new FormControl(this.worker.cedula, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }
  ngOnInit(): void {}
  ngOnChanges(): void {
    if (this.toEdit) {
      this.workerForm.setValue({
        name: this.worker.name,
        cedula: this.worker.cedula,
      });
    } else {
      this.workerForm.reset();
    }
  }
  onClose() {
    // this.showPopUp = false;
    this.workerForm.reset();
    this.changeModal.emit(false);
  }
  async validateFormWorker() {
    this.submitInvalid = this.workerForm.valid;
    if (this.workerForm.valid) {
      if (this.toEdit) {
        if (this.worker.id) {
          await this._workersServises
            .updateWorker(this.worker.id, this.workerForm.value)
            .then(() => {
              this.workerForm.reset();
              this.onClose();
              this.submitInvalid = true;
            });
        }
      } else {
        await this._workersServises
          .createWorker(this.workerForm.value)
          .then(() => {
            this.workerForm.reset();
            this.onClose();
            this.submitInvalid = true;
          });
      }
    }
  }
}
