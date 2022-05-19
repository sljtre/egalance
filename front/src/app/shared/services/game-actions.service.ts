import { Injectable } from '@angular/core';
import {PersoService} from '../services/perso.service'
import {TuilesService} from '../services/tuiles.service'
import { time } from 'highcharts';

@Injectable({
  providedIn: 'root'
})
export class GameActionsService {

  private eventLocation;
  private tuileActuel;

  constructor(
    public persoSerivce: PersoService,
    public tuilesService:TuilesService
  ) { 
    
  }

  actionsHandler=(action,localization,tuileActuel)=>{    
    this.eventLocation=localization;
    this.tuileActuel=tuileActuel;
   switch(action){
     case 'Eat':
       this.eatHandler();
   }
  }
  
  workHandler=()=>{  }

  marryHandler=()=>{  }

  rentHandler=()=>{  }

  shoppingHandler=()=>{  }

  drinkHandler=()=>{
    this.persoSerivce.perso.faim+=0.1

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
    if (this.tuileActuel==='Bar'){
      //cost some time
      //need to add some food smartly
      this.persoSerivce.perso.faim+=0.1;  
      this.persoSerivce.perso.fatigue-=0.01;
      //TODO : cout en fonction du salaire moen du pays
      this.persoSerivce.perso.Wallet-=Number(this.tuilesService.getSalaire(this.eventLocation))/100*0.8; 
      timeadd=3;

    }
    else if (this.tuileActuel==='Farm'){
      //need to add some food smartly
      this.persoSerivce.perso.faim+=0.5;  
      this.persoSerivce.perso.fatigue-=0.05;
      //TODO : cout en fonction du salaire moen du pays
      this.persoSerivce.perso.Wallet-=Number(this.tuilesService.getSalaire(this.eventLocation))/100*0.2; 
      timeadd=8;

    }
    else if (this.tuileActuel==='House'){
      //need to add some food smartly
      this.persoSerivce.perso.faim+=0.14;  
      this.persoSerivce.perso.fatigue-=0.014;
      //TODO : cout en fonction du salaire moen du pays
      this.persoSerivce.perso.Wallet-=Number(this.tuilesService.getSalaire(this.eventLocation))/100*0.5; 
      timeadd=5;

    }
    else if (this.tuileActuel==='Restaurant'){
      //need to add some food smartly
      this.persoSerivce.perso.faim+=0.3;  
      this.persoSerivce.perso.fatigue-=0.03;
      //TODO : cout en fonction du salaire moen du pays
      this.persoSerivce.perso.Wallet-=Number(this.tuilesService.getSalaire(this.eventLocation))/100*1.6; 
      timeadd=3;
    }
    return timeadd;
  }

  
}
