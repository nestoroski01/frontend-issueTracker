import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../user/shared/models/user.class';

@Injectable()
export class GlobalService {
  private user: BehaviorSubject<User> = new BehaviorSubject(null);
  $user = this.user.asObservable();

  private isLogged: boolean = false;

  constructor() { }

  getUser(): Observable<User> {
    return this.$user;
  }

  setUser(user: User): void {
    this.user.next(user);
  }

  getIsLogged(): boolean {
    return this.isLogged;
  }

  setIsLogged(isLogged: boolean): void {
    this.isLogged = isLogged;
  }
}
