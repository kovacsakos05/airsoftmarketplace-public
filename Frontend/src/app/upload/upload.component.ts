import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TermekekService } from '../termekek.service';
import { FelhasznalokLoginService } from '../felhasznalok-login.service';
import { Felhasznalok } from '../models/felhasznalok_model';
import { routes } from '../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  imports: [NgIf, FormsModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  selected = '';

  kiep1?: File;
  kiep2?: File;
  kiep3?: File;
  fegy1?: File;
  fegy2?: File;
  fegy3?: File;

  kiegeszito = {
    nev: '',
    tipus: '',
    ar: 0,
    leiras: '',
  };

  fegyver = {
    nev: '',
    tipus: '',
    ar: 0,
    leiras: '',
    mechanika: '',
    fps: 0,
    suly: 0,
    hossza: 0,
    csohossza:0,
    tuzmod: ''
  };

  user?: Felhasznalok;

  constructor(
    private termekekService: TermekekService,
    private loginService: FelhasznalokLoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.loginService.getUser();
  }

  onFileSelected(event: any, index: number, tipus: string) {
    const file = event.target.files[0];
    if (tipus === 'kiegeszito') {
      if (index === 1) this.kiep1 = file;
      if (index === 2) this.kiep2 = file;
      if (index === 3) this.kiep3 = file;
    } else {
      if (index === 1) this.fegy1 = file;
      if (index === 2) this.fegy2 = file;
      if (index === 3) this.fegy3 = file;
    }
  }

  feltoltes() {
    if (!this.user) {
      alert('Nincs bejelentkezett felhasználó!');
      return;
    }
  
    const formData = new FormData();
  
    if (this.selected === 'kiegeszito') {
      if (!this.kiep1 || !this.kiep2 || !this.kiep3) {
        document.getElementById('error')!.textContent = 'Minden kép feltöltése kötelező!';
        return;
      }
  
      if (this.kiegeszito.nev === '' || this.kiegeszito.tipus === '' || this.kiegeszito.ar === 0 || this.kiegeszito.leiras === '') {
        document.getElementById('error')!.textContent = 'Minden adat kitöltése kötelező!';
        return;
      }
  
      Object.entries(this.kiegeszito).forEach(([kulcs, ertek]) =>
        formData.append(kulcs, ertek.toString())
      );
      formData.append('tulajdonos', this.user?.id?.toString() ?? '');
      formData.append('kiegeszitok_img1', this.kiep1);
      formData.append('kiegeszitok_img2', this.kiep2);
      formData.append('kiegeszitok_img3', this.kiep3);
  
      this.termekekService.feltoltKiegeszito(formData).subscribe({
        next: () => {
          document.getElementById('sikeres')!.textContent = 'Kiegészítő sikeresen feltöltve!';
          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 3000);
    },
        error: (err) => {
          console.error(err);
          document.getElementById('error')!.textContent = 'Hiba történt a feltöltés során!';
        }
      });
    }
  
    if (this.selected === 'fegyver') {
      if (!this.fegy1 || !this.fegy2 || !this.fegy3) {
        document.getElementById('error')!.textContent = 'Minden kép feltöltése kötelező!';
        return;
      }
  
      if (
        this.fegyver.nev === '' || this.fegyver.tipus === '' || this.fegyver.ar === 0 ||
        this.fegyver.leiras === '' || this.fegyver.mechanika === '' || this.fegyver.fps === 0 ||
        this.fegyver.suly === 0 || this.fegyver.hossza === 0 || this.fegyver.tuzmod === '' || this.fegyver.csohossza === 0
      ) {
        document.getElementById('error')!.textContent = 'Minden adat kitöltése kötelező!';
        return;
      }
  
      Object.entries(this.fegyver).forEach(([kulcs, ertek]) =>
        formData.append(kulcs, ertek.toString())
      );
      formData.append('tulajdonos', this.user?.id?.toString() ?? '');
      formData.append('fegyverek_img1', this.fegy1);
      formData.append('fegyverek_img2', this.fegy2);
      formData.append('fegyverek_img3', this.fegy3);
  
      this.termekekService.feltoltFegyver(formData).subscribe({
        next: () => {
          document.getElementById('sikeres')!.textContent = 'Fegyver sikeresen feltöltve!';
          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 3000);
        },
        error: (err) => {
          console.error(err);
          document.getElementById('error')!.textContent = 'Hiba történt a feltöltés során!';
        }
      });
    }
  }
}
