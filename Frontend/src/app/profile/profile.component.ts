import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Felhasznalok } from '../models/felhasznalok_model';
import { FelhasznalokLoginService } from '../felhasznalok-login.service';
import { NgFor, NgIf} from '@angular/common';
import { TermekekService } from '../termekek.service';
import { Fegyverek } from '../models/fegyverek_model';
import { Kiegeszitok } from '../models/kiegeszitok_model';
import { FelhasznalokService } from '../felhasznalok.service';
import { RendelesService } from '../rendeles.service';
import { Rendeles } from '../models/rendeles_model';


@Component({
  selector: 'app-profile',
  imports: [NgFor,RouterModule, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  felhasznalo?: Felhasznalok;
  fegyverek: Fegyverek[] = [];
  kiegeszitok: Kiegeszitok[] = [];
  rendelesek: Rendeles[] = [];

  constructor(private login:FelhasznalokLoginService, private termekekService:TermekekService, private router: Router, private felhasznalokService: FelhasznalokService, private rendelesService: RendelesService) {
    this.felhasznalo = this.login.getUser();
    if (this.felhasznalo) {
      this.termekekService.FegyverekLekereFelhasznaloSzerint(this.felhasznalo.id!).subscribe((data) => {
        this.fegyverek = data;
      });
      this.felhasznalokService.felhasznaloLekerId(this.felhasznalo.id!).subscribe((data) => {
        this.felhasznalo = data;
      });
      this.termekekService.KiegeszitokLekereFelhasznaloSzerint(this.felhasznalo.id!).subscribe((data) => {
        this.kiegeszitok = data;
      });
      this.rendelesService.getRendelesekByUser(this.felhasznalo.id!).subscribe(data => {
        this.rendelesek = data;
        console.log(this.rendelesek);
      });
    }

  }

  deleteUser(){
    this.felhasznalokService.deleteFelhasznalo(this.felhasznalo!.id!).subscribe(() => {
      this.logout();
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('felhasznalo');
    setTimeout(() => {
      this.router.navigate(['home']);
    }, 1000);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  deleteFegyverek(id: number) {
    this.termekekService.deleteFegyverek(id).subscribe(() => {
      this.fegyverek = this.fegyverek.filter(f => f.id !== id);
    });
  }

  deleteKiegeszitok(id: number) {
    this.termekekService.deleteKiegeszitok(id).subscribe(() => {
      this.kiegeszitok = this.kiegeszitok.filter(k => k.id !== id);
    });
  }

  selectedFile?: File;
  
valasztottProfilkep: File | null = null;

onProfilkepValasztas(event: any) {
  if (event.target.files && event.target.files[0]) {
    this.valasztottProfilkep = event.target.files[0];
  }
}

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

uploadProfilePicture() {
  if (this.selectedFile && this.felhasznalo) {
    this.felhasznalokService.uploadProfilkep(this.felhasznalo.id!, this.selectedFile)
      .subscribe({
        next: (res) => {
          this.felhasznalo!.profilkep = res.profilkep;
          document.getElementById('sikeres')!.textContent = 'Profilkép sikeresen feltöltve';
        },
        error: (err) => {
          console.error('Hiba történt:', err);
          document.getElementById('sikertelen')!.textContent = 'Profilkép feltöltés sikertelen';
        }
      });
  }
}
}

