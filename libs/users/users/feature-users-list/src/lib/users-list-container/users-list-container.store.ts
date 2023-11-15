import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { UsersEntity, UsersFacade } from '@users/users/data-access';
import { DeepReadonly } from '@users/core/utils';
import { UsersVM } from '../users-vm';
import { tap } from 'rxjs';
import { usersVMAdapter } from '../users-vm.adapter';

export type UsersListState = DeepReadonly<{
  users: UsersVM[];
}>;

const initialState: UsersListState = {
  users: [],
};

@Injectable()
export class UsersListContainerStore extends ComponentStore<UsersListState> {
  public readonly users$ = this.select((state) => state.users);
  private readonly usersFacade = inject(UsersFacade);

  constructor() {
    super(initialState);
    this.usersFacade.init();
    this.setUsersFromGlobalToLocalStore();
  }

  public setUsersFromGlobalToLocalStore(): void {
    this.effect(() =>
      this.usersFacade.allUsers$.pipe(
        tap((users: UsersEntity[]) => this.patchUsers(users))
      )
    );
  }

  private patchUsers(users: UsersEntity[]): void {
    this.patchState({
      users: users.map((user) => usersVMAdapter.entityToVM(user)),
    });
  }
}
