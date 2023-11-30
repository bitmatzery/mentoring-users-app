import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';

export const USERS_FEATURE_KEY = 'users';

export type UsersFilter = {
  name: string;
  email: string;
  company: string;
  phone: string;
};

export interface UsersState extends EntityState<UsersEntity> {
  selectedId?: string | number; // which Users record has been selected
  loaded: boolean; // has the Users list been loaded
  error?: string | null; // last known error (if any)
  filter: UsersFilter;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const usersAdapter: EntityAdapter<UsersEntity> =
  createEntityAdapter<UsersEntity>();

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  filter: { name: '', email: '', company: '', phone: '' },
});

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.initUsers, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, loaded: true }),
  ),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UsersActions.filterUsers, (state, { filterParams }) => ({
    ...state,
    filter: filterParams,
  })),
  on(UsersActions.deleteUser, (state, { id }) =>
    usersAdapter.removeOne(id, { ...state }),
  ),
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}
