import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component, inject, ViewEncapsulation
} from '@angular/core';
import { UsersListComponent } from '../users-list/users-list.component';
import {
  UsersListContainerStore,
  UsersListState
} from './users-list-container.store';

@Component({
  selector: 'users-list-container',
  standalone: true,
  imports: [CommonModule, UsersListComponent],
  templateUrl: './users-list-container.component.html',
  styleUrls: ['./users-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersListContainerStore],
})
export class UsersListContainerComponent {
  private readonly componentStore = inject(UsersListContainerStore);
  public readonly users$ = this.componentStore.users$;

  OnDeleteUser(userId: number) {
    this.componentStore.patchState((state: UsersListState) => ({
      users: state.users.filter((user) => user.id !== userId),
    }));
  }
}
