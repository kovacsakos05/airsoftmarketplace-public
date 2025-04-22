export interface Kiegeszitok {
    id: number;
    nev:string;
    tipus: string;
    ar :number;
    leiras:string;
    kiegeszitok_img1: string;
    kiegeszitok_img2: string;
    kiegeszitok_img3: string;
    tulajdonos:Tuldajdonos;
    eladva:boolean;
};

export interface Tuldajdonos {
    id: number;
    nev: string;
    email:string;
    telefonszam:string;
    profilkep:string;
}