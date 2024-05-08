import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

import { RouterModule, Router } from '@angular/router';
import { routes } from '../../../../utils/rutes';
import { AuthService } from '../../../auth/services/auth.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, RouterModule, NgFor],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private _authService = inject(AuthService);
  rutas = routes;
  @Input() sidebarToggle: boolean = false;

  @Output() changeSidebar = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  onClose() {
    // this.showPopUp = false;
    this.changeSidebar.emit(false);
  }
  goOut() {
    this._authService.signOut();
    this.router.navigate(['/login']);
  }
}
