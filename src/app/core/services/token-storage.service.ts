import { Injectable } from '@angular/core';

const USER_KEY = 'userData';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  public getToken(): any {
    return localStorage.getItem(USER_KEY);
  }

  public saveFavoriteMovies(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getFavoriteMovies(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
