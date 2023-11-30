import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  UsersEntity,
  UsersFacade,
  UsersFilter,
} from '@users/users/data-access';
import { DeepReadonly } from '@users/core/utils';
import { UsersVM } from '../users-vm';
import { tap } from 'rxjs/operators';
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
  public readonly filterParams$ = this.usersFacade.filter$;

  // Для храниения юзеров в componentStore
  // private usersOfComponentStore: UsersVM[] = [];

  constructor() {
    super(initialState);
    this.usersFacade.init();
    this.setUsersFromGlobalToLocalStore();
  }

  // Инициализация юзеров Global Store в юзеров usersOfComponentStore в componentStore
  // public setUsersFromGlobalToLocalStore(): void {
  //   this.effect(() =>
  //     this.usersFacade.allUsers$.pipe(
  //       tap((users: UsersEntity[]) => {
  //         this.usersOfComponentStore = users.map((user) =>
  //           usersVMAdapter.entityToVM(user),
  //         );
  //         this.patchState({ users: this.usersOfComponentStore });
  //       }),
  //     ),
  //   );
  // }

  // Инициализация юзеров Global Store в componentStore
  public setUsersFromGlobalToLocalStore(): void {
    this.effect(() =>
      this.usersFacade.allUsers$.pipe(
        tap((users: UsersEntity[]) => {
          this.patchState({
            users: users.map((user) => usersVMAdapter.entityToVM(user)),
          });
        }),
      ),
    );
  }

  // Фильтрация юзеров в componentStore
  // public filterUsers(filterParams: UsersFilter) {
  //   if (
  //     filterParams.name ||
  //     filterParams.email ||
  //     filterParams.phone ||
  //     filterParams.company
  //   ) {
  //     const filteredUsers = this.usersOfComponentStore.filter(
  //       (user) =>
  //         user.name.toLowerCase().includes(filterParams.name.toLowerCase()) ||
  //         user.email.toLowerCase().includes(filterParams.email.toLowerCase()) ||
  //         user.phone.includes(filterParams.phone) ||
  //         user.company.name
  //           .toLowerCase()
  //           .includes(filterParams.company.toLowerCase()),
  //     );
  //     this.patchState({ users: filteredUsers });
  //   } else {
  //     this.patchState({ users: this.usersOfComponentStore });
  //   }
  // }

  // Фильтрация юзеров через usersFacade в Global Store
  public filterUsers(filterParams: UsersFilter) {
    this.usersFacade.filterUser(filterParams);
  }

  // Удаление (исключение юзера) в componentStore
  // public deleteUser(userId: number) {
  //   this.usersOfComponentStore = this.usersOfComponentStore.filter(
  //     (user) => user.id !== userId,
  //   );
  //   this.patchState({ users: this.usersOfComponentStore });
  // }

  // Удаление (исключение юзера) в componentStore из
  // инициализированных юзеров от Global Store
  public OnDeleteUser(userId: number) {
    this.patchState((state: UsersListState) => ({
      users: state.users.filter((user) => user.id !== userId),
    }));
  }
}
