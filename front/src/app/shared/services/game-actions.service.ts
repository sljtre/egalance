import { Injectable } from '@angular/core';
import {PersoService} from '../services/perso.service'

@Injectable({
  providedIn: 'root'
})
export class GameActionsService {

  private eventLocation;
  private tuileActuel;

  constructor(
    public persoSerivce: PersoService,
  ) { 
    
  }

  eventHandler=(action,localization,tuileActuel)=>{    
    this.eventLocation=localization;
    this.tuileActuel=tuileActuel;
    console.log(action);
    console.log(tuileActuel);

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
    if (this.tuileActuel==='Bar'){
      //cost some time
      this.persoSerivce.perso.faim+=0;  //need to add some food smartly
      this.persoSerivce.perso.Wallet-=0;  //TODO : cout en fonction du salaire moen du pays

    }
    else if (this.tuileActuel==='Farm'){

    }
    else if (this.tuileActuel==='House'){

    }
    else if (this.tuileActuel==='Restaurant'){

    }
  }

  
}
