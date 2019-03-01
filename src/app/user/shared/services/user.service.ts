import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';

@Injectable()
export class UserService {

  private url: String = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  addUser(user): Observable<User> {
    return this.http.post<User>(`${this.url}/users/add`, user);
  }

  getUserById(id): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${id}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users/`);
  }

  loginUser(loginObject): Observable<User> {
    return this.http.post<User>(`${this.url}/users/login`, loginObject);
  }

  emailCheckNotTaken(email): Observable<any> {
    return this.http.get<any>(`${this.url}/users/email/${email}`);
  }

}
