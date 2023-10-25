import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { UsersApiService } from '@users/data-access';
import { HttpClientModule } from '@angular/common/http';
import { UsersListComponent } from '@users/feature-users-list';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    UsersListComponent,
    RouterModule,
    HttpClientModule
  ],
  providers: [UsersApiService],
  selector: 'beginner-task-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'beginner-task';
  private readonly usersApiService = inject(UsersApiService)
}
