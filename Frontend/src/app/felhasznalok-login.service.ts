import { Injectable } from '@angular/core';
import { Felhasznalok } from './models/felhasznalok_model';

@Injectable({
  providedIn: 'root'
})
export class FelhasznalokLoginService {
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
  getUser(): Felhasznalok {
    const userData = localStorage.getItem('felhasznalo');
    return userData ? JSON.parse(userData) : null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('felhasznalo');
    window.location.reload();
  }
}
