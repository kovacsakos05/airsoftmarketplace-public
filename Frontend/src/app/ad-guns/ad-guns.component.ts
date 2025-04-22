import { Component } from '@angular/core';
import { Fegyverek } from '../models/fegyverek_model';
import { TermekekService } from '../termekek.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FelhasznalokLoginService } from '../felhasznalok-login.service';
import { Felhasznalok } from '../models/felhasznalok_model';

@Component({
  selector: 'app-ad-guns',
  imports: [NgFor,NgIf],
  templateUrl: './ad-guns.component.html',
  styleUrls: ['./ad-guns.component.css']
})
export class AdGunsComponent {
  fegyverek:Fegyverek[]=[];
  fegyverek1?:Fegyverek;
  id?:number;
  felhasznalo?:Felhasznalok;
  

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id')){
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.showGun2();
    }
  }

  constructor(private termekekservice:TermekekService,private route: ActivatedRoute, private router: Router, private bejelentkezett: FelhasznalokLoginService){
    this.getFegyverek()
    this.felhasznalo = this.bejelentkezett.getUser();
  }

  getFegyverek(){
    return this.termekekservice.FegyverekLeker().subscribe(data=> {this.fegyverek = data;console.log(this.fegyverek)});
  }

  showGun(f:number) {
    this.termekekservice.FegyverekLeker1(f).subscribe(data=> {this.fegyverek1 = data;console.log(this.fegyverek1)});
  }

  showGun2() {
    this.showGun(this.id!);
  }

  alpaErtek(){
    this.fegyverek1 = undefined;
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