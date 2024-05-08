import { Component, inject, OnInit } from '@angular/core';
import { UsersModalComponent } from '../../components/modals/users-modal/users-modal.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersModalComponent, NgIf, NgFor, AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  showModal = false;

  //variable donde se almacenaran los usuarios
  users$: any;
  private _userServices = inject(UserService);

  ngOnInit(): void {
    this.users$ = this._userServices.getUsers();
  }
  changeModal(status: boolean) {
    this.showModal = status;
  }
  //eliminar usuario
  deleteUser(id: string) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Una vez eliminado, ¡no podrá recuperar el usuario!',
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed) {
        this._userServices.deleteUser(id);
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
