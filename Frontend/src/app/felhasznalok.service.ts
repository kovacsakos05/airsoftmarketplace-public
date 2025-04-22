import { Injectable } from '@angular/core';
import { Felhasznalok } from './models/felhasznalok_model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FelhasznalokService {
  private felhasznalokSubject = new BehaviorSubject<Felhasznalok[]>([]);
  felhasznalok$ = this.felhasznalokSubject.asObservable();
  private apiUrl = 'http://127.0.0.1:8000/api/felhasznalok';

  constructor(private http: HttpClient) {
    this.FelhasznalokLeker1().subscribe(felhasznalok => {
      this.felhasznalokSubject.next(felhasznalok);
    });
  }

  FelhasznalokLeker1(): Observable<Felhasznalok[]> {
    return this.http.get<Felhasznalok[]>(this.apiUrl);
  }

  FelhasznaloFelvisz(felhasznalo: Felhasznalok): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, felhasznalo, { headers });
  }

  FelhasznaloVizsgal(nev: string): Observable<boolean> {
    return this.felhasznalok$.pipe(
      map(felhasznalok => !felhasznalok.some(f => f.nev === nev))
    );
  }

  EmailVizsgal(email: string): Observable<boolean> {
    return this.felhasznalok$.pipe(
      map(felhasznalok => !felhasznalok.some(f => f.email === email))
    );
  }

  uploadProfilkep(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profilkep', file);

    return this.http.post(`${this.apiUrl}/${id}/profilkep`, formData);
  }

  felhasznaloLekerId(id:number){
    return this.http.get<Felhasznalok>(`${this.apiUrl}/${id}`);
  }

  deleteFelhasznalo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}


