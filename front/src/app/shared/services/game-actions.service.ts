import { Injectable } from '@angular/core';
import {PersoService} from '../services/perso.service'

@Injectable({
  providedIn: 'root'
})
export class GameActionsService {

  private actionCity;
  private tuileActuelle;

  constructor(
    public persoSerivce: PersoService,
  ) {

  }

  actionHandler=(action,localization,tuileActuelle)=>{
    this.actionCity=localization;
    this.tuileActuelle=tuileActuelle;
    console.log(action);
    console.log(tuileActuelle);

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
    if (this.tuileActuelle==='Bar'){
      //cost some time
      this.persoSerivce.perso.faim+=0;  //need to add some food smartly
      this.persoSerivce.perso.Wallet-=0;  //TODO : cout en fonction du salaire moen du pays

    }
    else if (this.tuileActuelle==='Farm'){

    }
    else if (this.tuileActuelle==='House'){

    }
    else if (this.tuileActuelle==='Restaurant'){

    }
  }


}
