import {  Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { User, UsersApiService } from '@users/data-access'


@Component({
  selector: 'beginner-task-users-list',
  standalone: true,
  imports:
  [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [UsersApiService],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  private readonly UsersApiService = inject(UsersApiService);
  public users: User[] = [];

  constructor() {
    this.UsersApiService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    })
  }

  OnDeleteUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
  }
}

