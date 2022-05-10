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

  custom = (religion, gender, skin, name) => {
    this.perso.customization(religion, gender, skin, name);
  };

}
