export interface Fegyverek {
    id: number;
    nev:string;
    tipus: string;
    ar :number;
    leiras:string;
    mechanika:string;
    fps:number;
    fegyverek_img1: string;
    fegyverek_img2: string;
    fegyverek_img3: string;
    suly:number;
    hossza:number;
    csohossza:number;
    tuzmod:string;
    tulajdonos:Tuldajdonos;
    eladva:boolean;
};
export interface Tuldajdonos{
    id:number;
    nev:string;
    email:string;
    telefonszam:string;
    profilkep:string;   
}