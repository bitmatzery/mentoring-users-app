import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListVM } from './users-list-view-model';
import { UsersListFilterComponent } from '../users-list-filter/users-list-filter.component';

@Component({
  selector: 'users-list-ui',
  standalone: true,
  imports: [CommonModule, UsersListFilterComponent],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  @Input({ required: true })
  vm!: UsersListVM;

  @Output() deleteUser = new EventEmitter();
  @Output() filterUsers = new EventEmitter();

  OnDeleteUser(userId: number) {
    this.deleteUser.emit(userId);
  }

    OnFiltredUsers(event: { name: string }) {
    this.filterUsers.emit(event);
  }
}
