import { Component } from '@angular/core';
import { Felhasznalok } from '../models/felhasznalok_model';
import { FelhasznalokService } from '../felhasznalok.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf, NgClass, MatInputModule, MatFormFieldModule, MatIconModule, MatDatepickerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  felhasznalonev = '';
  felhasznalojelszo = '';
  constructor(private felhasznalokService: FelhasznalokService, private router: Router) {}
  visszajelzes:string = '';
  hiba:boolean = false;
  sikeres:boolean = false;

  login() {
    if (!this.felhasznalonev.length || !this.felhasznalojelszo.length) {
      this.visszajelzes = "Mindent ki kell tölteni!";
      this.hiba=true;
      this.sikeres=false;
      return;
    }

    this.felhasznalokService.FelhasznalokLeker1().subscribe(felhasznalok => {
      const felhasznalo = felhasznalok.find(f => f.nev === this.felhasznalonev);
      if (felhasznalo && felhasznalo.jelszo === this.felhasznalojelszo) {
        localStorage.setItem('token', 'token');
        localStorage.setItem('felhasznalo', JSON.stringify(felhasznalo));
        this.visszajelzes = "Sikeres belépés!";
        this.hiba=false;
        this.sikeres=true;
        setTimeout(() => {
          this.router.navigate(['home']);
        }, 1000);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        this.visszajelzes = "Hibás felhasználónév vagy jelszó!";
        this.hiba=true;
        this.sikeres=false;
      }
    });
  }
}
