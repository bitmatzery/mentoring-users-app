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

@Component({
  selector: 'users-list-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  @Input({ required: true })
  vm!: UsersListVM;

  @Output() deleteUser = new EventEmitter();

  OnDeleteUser(userId: number) {
    this.deleteUser.emit(userId);
  }
}
