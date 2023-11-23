import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { FooterComponent, HeaderComponent } from '@users/core/ui/layout';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent, PushPipe],
  providers: [],
  selector: 'users-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'users';
}
