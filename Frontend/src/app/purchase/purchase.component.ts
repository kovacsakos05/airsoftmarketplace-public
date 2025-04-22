import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RendelesService } from '../rendeles.service';
import { FelhasznalokLoginService } from '../felhasznalok-login.service';
import { Felhasznalok } from '../models/felhasznalok_model';
import { FormsModule } from '@angular/forms';
import { Kiszallitas } from '../models/rendeles_model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { TermekekService } from '../termekek.service';


@Component({
  selector: 'app-purchase',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule,CommonModule],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent {
  termekId!: number;
  termekTipus!: string;
  felhasznalo!: Felhasznalok;
  kiszallitasok: Kiszallitas[] = [];
  termekar:number = 0;
  kiszallitasara:number = 0;
  osszar:number = 0;

  formData: any = {
    keresztnev: '',
    vezeteknev: '',
    iranyitoszam: '',
    varos: '',
    utca_hazszam: '',
    kiszallitasok_id: '',
    fizetendo: this.osszar
  };

  constructor(
    private route: ActivatedRoute,
    private rendelesService: RendelesService,
    private loginService: FelhasznalokLoginService,
    private termekekservice: TermekekService,
    private router: Router
  ) {
    this.rendelesService.getDeliveryForms().subscribe(data => {
      this.kiszallitasok = data;
      console.log(this.kiszallitasok);
    });
  }
  
  frissitVegosszeg() {
    if (this.termekar && this.kiszallitasara) {
      this.osszar = this.termekar + this.kiszallitasara;
      this.formData.fizetendo = this.osszar;
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.termekId = params['id'];
      this.termekTipus = params['tipus'];
    });
    this.felhasznalo = this.loginService.getUser()!;
    if(this.termekTipus === 'fegyver'){
      this.termekekservice.FegyverekLeker1(this.termekId).subscribe(data=> {
        this.termekar = data.ar;
        this.frissitVegosszeg();
      });
    }
    if(this.termekTipus === 'kiegeszito'){
      this.termekekservice.KiegeszitokLeker1(this.termekId).subscribe(data=> {
        this.termekar = data.ar;
        this.frissitVegosszeg();
      });
    }
  }
  
  KiszallitasAr(id: number){
    this.rendelesService.getDeliveryById(id).subscribe(data => {
      this.kiszallitasara = data.kiszallitas_ara;
      this.frissitVegosszeg();
    });
  }

  submitRendeles() {
    if(this.formData.keresztnev === '' || this.formData.vezeteknev === '' || this.formData.iranyitoszam === '' || this.formData.varos === '' || this.formData.utca_hazszam === '' || this.formData.telefonszam === '' || this.formData.kiszallitasok_id === '') {
      document.getElementById('error')!.textContent = 'Minden mezőt ki kell tölteni!';
      return;
    }
    const adatok: any = {
      ...this.formData,
      felhasznalok_id: this.felhasznalo.id,
      telefonszam: this.felhasznalo.telefonszam
    };

    if (this.termekTipus === 'fegyver') {
      adatok.fegyverek_id = this.termekId;
    } else if (this.termekTipus === 'kiegeszito') {
      adatok.kiegeszitok_id = this.termekId;
    }

    this.rendelesService.megrendeles(adatok).subscribe({
      next: (res) => {
        document.getElementById('sikeres')!.textContent = 'Rendelés sikeresen leadva';
        setTimeout(() => {
          this.router.navigate(['/profile']);
          if (this.termekTipus === 'fegyver') {
            this.termekekservice.updateFegyver(this.termekId, { eladva: true }).subscribe();
          } else if (this.termekTipus === 'kiegeszito') {
            this.termekekservice.updateKiegeszito(this.termekId, { eladva: true }).subscribe();
          }
        }, 3000);
      },
      error: (err) => {
        console.error('Hiba történt a rendelés során:', err);
        document.getElementById('sikertelen')!.textContent = 'Rendelés leadása sikertelen';
        setTimeout(() => {
          document.getElementById('sikertelen')!.textContent = 'A rendelés sikertelen, próbálja meg újra';
        }, 3000);
      }
    });
  }
}
