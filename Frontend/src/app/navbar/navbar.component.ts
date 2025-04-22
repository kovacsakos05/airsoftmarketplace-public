import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FelhasznalokLoginService } from '../felhasznalok-login.service';
import { Felhasznalok } from '../models/felhasznalok_model';
import { NgIf } from '@angular/common';
import { FelhasznalokService } from '../felhasznalok.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  felhasznalo?: Felhasznalok;
  isLoggedIn: boolean = false;
  isIMG: boolean = false;

  constructor(private felhasznaloLoginService: FelhasznalokLoginService, private felhasznalokService: FelhasznalokService) {
    this.felhasznalo = this.felhasznaloLoginService.getUser();
    this.isLoggedIn = this.felhasznaloLoginService.isLoggedIn();
    if(this.felhasznalo){
      this.felhasznalokService.felhasznaloLekerId(this.felhasznalo.id!).subscribe((data) => {
        this.felhasznalo = data;
      });
    }
  }
  
  
  NavbarFix(){
    if(window.scrollY > 100){
      document.getElementById('navbar')?.classList.add('fixed-top');
      document.getElementById('navbar')?.classList.add('opacity-75');
    }
    else{
      document.getElementById('navbar')?.classList.remove('fixed-top');
      document.getElementById('navbar')?.classList.remove('opacity-75');
    }
  }

  
  
}
