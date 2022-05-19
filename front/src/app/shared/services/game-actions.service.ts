import { Injectable } from '@angular/core';
import {PersoService} from '../services/perso.service'
import {TuilesService} from '../services/tuiles.service'

@Injectable({
  providedIn: 'root'
})
export class GameActionsService {

  private actionCity;
  private tuileActuelle;

  constructor(
    public persoService: PersoService,
    public tuilesService:TuilesService
  ) {

  }

  actionHandler=(action,localization,tuileActuelle)=>{
    let result;
    this.actionCity=localization;
    this.tuileActuelle=tuileActuelle;
    switch(action){
      case 'Eat':
        result=this.eatHandler();
        break;
      case 'Work':
        result=this.workHandler();
        break;
      default:break;
    }
    return result;
  }

  workHandler=()=>{
    const coefStudies = this.tuilesService.getIncomeMultiplicator(this.tuileActuelle, this.persoService.perso.instructionLevel);
    const tolerance = 1-this.tuilesService.getTolerance(this.persoService.perso.localization);
    let differenceScore = Math.abs(Number(this.tuilesService.getEthnie(this.persoService.perso.localization))
      -Number(this.persoService.perso.skin));
    if(this.persoService.perso.religion!==this.tuilesService.getReligion(this.persoService.perso.localization)){
      differenceScore++;
    }
    console.log('difference : ', differenceScore);
    const coefSalaire = 1-tolerance*0.2*differenceScore;
    this.persoService.perso.wallet+= this.tuilesService.getSalaire(this.persoService.perso.localization)*coefSalaire;
    return 30;
  }

  marryHandler=()=>{  }

  rentHandler=()=>{  }

  shoppingHandler=()=>{  }

  drinkHandler=()=>{
    this.persoService.perso.faim+=0.1;

   }

  restHandler=()=>{ }

  studyHandler=()=>{}

  healHandler=()=>{ }

  watchHandler=()=>{}

  prayHandler=()=>{}

  practiceHandler=()=>{}

  depositHandler=()=>{}

  withdrawHandler=()=>{}

  travelHandler=()=>{}

  eatHandler=()=>{
    let timeadd=0;                    //time in days
    if (this.tuileActuelle==='Bar'){
      //cost some time
      //need to add some food smartly
      this.persoService.perso.faim+=0.1;
      this.persoService.perso.fatigue-=0.01;
      //TODO : cout en fonction du salaire moen du pays
      this.persoService.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.8;
      timeadd=3;

    }
    else if (this.tuileActuelle==='Farm'){
      //need to add some food smartly
      this.persoService.perso.faim+=0.5;
      this.persoService.perso.fatigue-=0.05;
      //TODO : cout en fonction du salaire moen du pays
      this.persoService.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.2;
      timeadd=8;

    }
    else if (this.tuileActuelle==='House'){
      //need to add some food smartly
      this.persoService.perso.faim+=0.14;
      this.persoService.perso.fatigue-=0.014;
      //TODO : cout en fonction du salaire moen du pays
      this.persoService.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*0.5;
      timeadd=5;

    }
    else if (this.tuileActuelle==='Restaurant'){
      //need to add some food smartly
      this.persoService.perso.faim+=0.3;
      this.persoService.perso.fatigue-=0.03;
      //TODO : cout en fonction du salaire moen du pays
      this.persoService.perso.Wallet-=Number(this.tuilesService.getSalaire(this.actionCity))/100*1.6;
      timeadd=3;
    }
    return timeadd;
  }


}
