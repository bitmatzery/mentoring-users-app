import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { LetDirective } from '@ngrx/component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersListComponent } from '../users-list/users-list.component';
import {
  UsersListContainerStore,
  UsersListState,
} from './users-list-container.store';
import { UsersFacade, UsersFilter } from '@users/users/data-access';

@Component({
  selector: 'users-list-container',
  standalone: true,
  imports: [
    CommonModule,
    PushPipe,
    LetDirective,
    UsersListComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './users-list-container.component.html',
  styleUrls: ['./users-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersListContainerStore],
})
export class UsersListContainerComponent implements OnDestroy {
  private readonly componentStore = inject(UsersListContainerStore);
  public readonly users$ = this.componentStore.users$;

  public usersFacade = inject(UsersFacade);
  public readonly filterParams$ = this.usersFacade.filter$;

  OnDeleteUser(userId: number) {
    this.componentStore.patchState((state: UsersListState) => ({
      users: state.users.filter((user) => user.id !== userId),
    }));
  }

  onFilterUsers(filterParams: UsersFilter) {
    this.usersFacade.filterUser(filterParams);
  }

  ngOnDestroy() {
    this.usersFacade.filterUser({
      name: '',
      email: '',
      phone: '',
      company: '',
    });
  }
}
