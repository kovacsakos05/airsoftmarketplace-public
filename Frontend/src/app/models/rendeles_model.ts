export interface Rendeles {
    id: number;
    fegyverek_id?: number;
    kiegeszitok_id?: number;
    felhasznalok_id: Tulajdonos;
    keresztnev: string;
    vezeteknev: string;
    iranyitoszam: number;
    varos: string;
    utca_hazszam: string;
    telefonszam: string;
    kiszallitasok_id: number;
    fizetendo: number;
    fegyver?: Termek;
    kiegeszito?: Termek;
    kiszallitas?: Kiszallitas;
  }
  
  export interface Tulajdonos {
    id: number;
    nev: string;
    email: string;
    telefonszam: string;
    profilkepUrl?: string;
  }
  
  export interface Kiszallitas {
    id: number;
    kiszallitas_fajta: string;
    kiszallitas_ara: number;
  }
  
  export interface Termek {
    id: number;
    nev: string;
    leiras?: string;
    ar: number;
  }