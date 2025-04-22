import { NgFor, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';

import { TermekekService } from '../termekek.service';
import { Fegyverek } from '../models/fegyverek_model';
import { Kiegeszitok } from '../models/kiegeszitok_model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgFor, SlicePipe, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    fegyverek:Fegyverek[]=[];
    kiegeszitok:Kiegeszitok[]=[];

    constructor(private termekekservice:TermekekService){
      this.getFegyverek()
      this.getKiegeszitok()
    }

    getFegyverek(){
      return this.termekekservice.FegyverekLeker().subscribe(data=> {this.fegyverek = data;console.log(this.fegyverek)});
    }

    getKiegeszitok(){
      return this.termekekservice.KiegeszitokLeker().subscribe(data=> {this.kiegeszitok = data;console.log(this.kiegeszitok)});
    }

    animation(reference:string,value:number){
      if(window.scrollY > value){
        document.getElementById(reference)?.classList.add('animated');
        document.getElementById(reference)?.classList.add('animatedFadeInUp');
        document.getElementById(reference)?.classList.add('fadeInUp');
      }
      else{
        document.getElementById(reference)?.classList.remove('animated');
        document.getElementById(reference)?.classList.remove('animatedFadeInUp');
        document.getElementById(reference)?.classList.remove('fadeInUp');
      }
    }
}
