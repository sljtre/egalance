import { Injectable } from '@angular/core';
import {Perso} from '../classes/perso';

@Injectable({
  providedIn: 'root'
})
export class PersoService {

  public perso;

  constructor() {}

  createPerso = (loc) => {
    this.perso = new Perso(loc);
  };

  custom = (religion, gender, skin, name,birthdayDay,birthdayMonth,socioEcoStart) => {
    this.perso.customization(religion, gender, skin, name,birthdayDay,birthdayMonth,socioEcoStart);
  };

  dev = (loc, religion, gender, skin, name) => {
    this.perso = new Perso(loc);
    this.perso.customization(religion, gender, skin, name);
  };

  faim=()=>{
   this.perso.calculFaim();
  };

  fatigue=()=>{
    this.perso.calculFatigue();
  };

  sante=()=>{
    this.perso.calculSante();
  };

  malade=()=>{
    this.perso.fallSick();
  };

  calculAll=()=>{
    this.perso.calculFaim();
    this.perso.calculFatigue();
    this.perso.calculSante();
  };

}
