import { Component, inject, OnInit } from '@angular/core';
import { WorkersModalComponent } from '../../components/modals/workers-modal/workers-modal.component';
import dayjs from 'dayjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { WorkersService } from '../../services/workers.service';
import { Worker } from '../../interfaces/workers.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-workers',
  standalone: true,
  imports: [WorkersComponent, AsyncPipe, NgFor, WorkersModalComponent, NgIf],
  templateUrl: './workers.component.html',
  styleUrl: './workers.component.scss',
})
export class WorkersComponent implements OnInit {
  private _workersServises = inject(WorkersService);

  toEdit = false;
  worker: Worker = {
    name: '',
    cedula: '',
  };

  //variable donde se almacenaran los operarios
  workers$: any;
  showModal = false;

  ngOnInit(): void {
    this.workers$ = this._workersServises.getWorkers();
  }

  //abrir modal de crear operario
  changeModal(status: boolean) {
    this.toEdit = false;
    this.showModal = status;
  }

  onClickUpdateProduct(workerData: Worker) {
    this.worker = workerData;
    //abre el modal y activa la opción de edit
    this.toEdit = true;
    this.showModal = true;
  }

  //eliminar operario
  deleteWoker(id: string) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Una vez eliminado, ¡no podrá recuperar el operario!',
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed) {
        this._workersServises.deleteWorker(id);
      }
    });
  }

  // convertir las fechas a formato YYYY-MM-DD
  convertDate(workerData: Worker | any) {
    {
      if (workerData.createdAt) {
        return dayjs(workerData.createdAt.toDate()).format('YYYY-MM-DD');
      }
      return 'null';
    }
  }
}
