import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { Fegyverek } from './models/fegyverek_model';
import { Kiegeszitok } from './models/kiegeszitok_model';


@Injectable({
  providedIn: 'root'
})
export class TermekekService {

  constructor(private http:HttpClient){
    this.FegyverekLeker();
    this.KiegeszitokLeker();
  }

  FegyverekLeker():Observable<Fegyverek[]>{
    return this.http.get<Fegyverek[]>('http://127.0.0.1:8000/api/fegyverek');
    
  }

  KiegeszitokLeker():Observable<Kiegeszitok[]>{
    return this.http.get<Kiegeszitok[]>('http://127.0.0.1:8000/api/kiegeszitok');
  }

  FegyverekLeker1(id:number):Observable<Fegyverek>{
    return this.http.get<Fegyverek>(`http://127.0.0.1:8000/api/fegyverek/${id}`);
  }

  KiegeszitokLeker1(id:number):Observable<Kiegeszitok>{
    return this.http.get<Kiegeszitok>(`http://127.0.0.1:8000/api/kiegeszitok/${id}`);
  }

  FegyverekLekereFelhasznaloSzerint(id: number): Observable<Fegyverek[]> {
    return this.FegyverekLeker().pipe(
      map(fegyverek => fegyverek.filter(f => f.tulajdonos.id === id))
    );
  }

  KiegeszitokLekereFelhasznaloSzerint(id: number): Observable<Kiegeszitok[]> {
    return this.KiegeszitokLeker().pipe(
      map(kiegeszitok => kiegeszitok.filter(k => k.tulajdonos.id === id))
    );
  }
  deleteFegyverek(id: number): Observable<void> {
    return this.http.delete<void>(`http://127.0.0.1:8000/api/fegyverek/${id}`);
    }
  deleteKiegeszitok(id: number): Observable<void> {
    return this.http.delete<void>(`http://127.0.0.1:8000/api/kiegeszitok/${id}`);
    }

    feltoltKiegeszito(formData: FormData): Observable<any> {
      return this.http.post('http://127.0.0.1:8000/api/kiegeszitok', formData);
    }
    
    feltoltFegyver(formData: FormData): Observable<any> {
      return this.http.post('http://127.0.0.1:8000/api/fegyverek', formData);
    }

    updateFegyver(id: number, data: any): Observable<any> {
      return this.http.put<any>(`http://127.0.0.1:8000/api/fegyverek/${id}`, data);
    }

    updateKiegeszito(id: number, data: any): Observable<any> {
      return this.http.put<any>(`http://127.0.0.1:8000/api/kiegeszitok/${id}`, data);
    }
}
