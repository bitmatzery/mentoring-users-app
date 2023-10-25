import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http"
import { User } from "./user.interface";

@Injectable()
export class UsersApiService {
  private readonly http = inject(HttpClient);

  public  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
  }

  constructor() {
    this.getUsers().subscribe(console.log)
  }
}
