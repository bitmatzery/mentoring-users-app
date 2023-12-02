import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { PushPipe } from '@ngrx/component';

@Component({
  selector: 'users-list-filter',
  standalone: true,
  templateUrl: './users-list-filter.component.html',
  styleUrls: ['./users-list-filter.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    PushPipe,
    FormsModule,
  ],
})
export class UsersListFilterComponent {
  @Output() filterUsers = new EventEmitter();
  protected filterName = '';
  private readonly router = inject(Router);

  OnFiltredUsers() {
    this.filterUsers.emit({
      name: this.filterName,
      email: this.filterName,
      phone: this.filterName,
      company: this.filterName,
    });
  }

  clearFilterName() {
    this.filterName = '';
    this.filterUsers.emit({
      name: this.filterName,
      email: this.filterName,
      phone: this.filterName,
      company: this.filterName,
    });
    this.router.navigate(['/home']);
  }
}
