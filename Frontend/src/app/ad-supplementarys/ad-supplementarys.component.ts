import { Component } from '@angular/core';
import { TermekekService } from '../termekek.service';
import { Kiegeszitok } from '../models/kiegeszitok_model';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Felhasznalok } from '../models/felhasznalok_model';
import { FelhasznalokLoginService } from '../felhasznalok-login.service';

@Component({
  selector: 'app-ad-supplementarys',
  imports: [NgIf,NgFor],
  templateUrl: './ad-supplementarys.component.html',
  styleUrl: './ad-supplementarys.component.css'
})
export class AdSupplementarysComponent {
  kiegeszitok:Kiegeszitok[]=[];
  kiegeszitok1?:Kiegeszitok;
  id?:number;
  felhasznalo?:Felhasznalok;

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id')){
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.showSup2();
    }
  }

  constructor(private termekekservice:TermekekService,private route: ActivatedRoute, private router: Router, private bejelentkezett: FelhasznalokLoginService){
  this.getKiegeszitok()
  this.felhasznalo = this.bejelentkezett.getUser();
}

  getKiegeszitok(){
    return this.termekekservice.KiegeszitokLeker().subscribe(data=> {this.kiegeszitok = data;console.log(this.kiegeszitok)});
  }

  showSup(K:number) {
    this.termekekservice.KiegeszitokLeker1(K).subscribe(data=> {this.kiegeszitok1 = data;console.log(this.kiegeszitok1)});
    console.log(this.kiegeszitok1);
  }

  showSup2(){
    this.showSup(this.id!);
  }

  alpaErtek(){
    this.kiegeszitok1 = undefined;
  }
  goToPurchase(id: number, tipus: 'fegyver' | 'kiegeszito') {
    if(!this.felhasznalo?.id){
      document.getElementById('error')!.innerText = 'Regisztráció vagy bejelentkezés szükséges!';
      return;
    }
    this.router.navigate(['/purchase'], {
      queryParams: {
        id: id,
        tipus: tipus
      }
    });
  }
}
