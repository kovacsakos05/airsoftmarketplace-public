import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kiszallitas, Rendeles } from './models/rendeles_model';

@Injectable({
  providedIn: 'root'
})
export class RendelesService {


  constructor(private http: HttpClient) {}

  megrendeles(data: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/rendelesek', data);
  }

  getDeliveryForms(): Observable<Kiszallitas[]>{
    return this.http.get<Kiszallitas[]>('http://127.0.0.1:8000/api/kiszallitasok');
  }

  getDeliveryById(id: number): Observable<Kiszallitas> {
    return this.http.get<Kiszallitas>(`http://127.0.0.1:8000/api/kiszallitasok/${id}`);
  }

  getRendelesekByUser(id: number): Observable<any[]> {
    return this.http.get<any[]>(`http://127.0.0.1:8000/api/rendelesek/felhasznalo/${id}`);
  }

}
