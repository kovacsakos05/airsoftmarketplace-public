import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FelhasznalokService } from '../felhasznalok.service';
import { Felhasznalok } from '../models/felhasznalok_model';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  felhasznalonev = '';
  felhasznaloemail = '';
  felhasznalojelszo = '';
  felhasznalojelszo2 = '';
  felhasznaloszuldatum = '';
  felhasznalotelefonszam = '';
  visszajelzes:string = '';
  hiba:boolean = false;
  sikeres:boolean = false;

  constructor(private felhasznalokService: FelhasznalokService, private router: Router) {}

  register() {
    if (!this.felhasznalonev || !this.felhasznaloemail || !this.felhasznalojelszo || 
        !this.felhasznaloszuldatum || !this.felhasznalotelefonszam) {
      this.visszajelzes = "Mindent ki kell tölteni!";
      this.hiba=true;
      this.sikeres=false;
      return;
    }

    if (this.felhasznalojelszo !== this.felhasznalojelszo2) {
      this.visszajelzes = "A jelszó nem egyezik!";
      this.hiba=true;
      this.sikeres=false;
      return;
    }

    if (!/^[0-9]{9}$/.test(this.felhasznalotelefonszam)) {
      this.visszajelzes = "Telefonszám formátuma nem megfelelő (pl: 301234567)";
      this.hiba = true;
      return;
    }

    if (!this.felhasznaloemail.includes('@') || !this.felhasznaloemail.includes('.')) {
      this.visszajelzes = "Nem megfelelő e-mail formátum!";
      this.hiba = true;
      this.sikeres = false;
      return;
    }

    this.felhasznalokService.FelhasznaloVizsgal(this.felhasznalonev).subscribe(nevUres => {
      if (!nevUres) {
        this.visszajelzes = "A felhasználónév már létezik!";
        this.hiba=true;
        this.sikeres=false;
        return;
      }

      this.felhasznalokService.EmailVizsgal(this.felhasznaloemail).subscribe(emailUres => {
        if (!emailUres) {
          this.visszajelzes = "Az email már létezik!";
          this.hiba=true;
          this.sikeres=false;
          return;
        }

        const ujFelhasznalo: Felhasznalok = {
          nev: this.felhasznalonev,
          jelszo: this.felhasznalojelszo,
          email: this.felhasznaloemail,
          telefonszam: "+36" + this.felhasznalotelefonszam,
          szulDatum: this.felhasznaloszuldatum,
          regisztracio_datuma: new Date().toISOString().split('T')[0]
        };

        console.log(ujFelhasznalo);

        this.felhasznalokService.FelhasznaloFelvisz(ujFelhasznalo).subscribe({
          next: () => {
            this.hiba=false;
            this.sikeres=true;
            this.visszajelzes = "Sikeres regisztráció!";
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          },
          error: (err) => {
            console.error("Hiba történt:", err);
            
            this.visszajelzes = "Nem sikerült a regisztráció, próbáld újra.";
          }
        });
      });
    });
  }
}



