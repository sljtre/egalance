import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {PersoService} from '../services/perso.service';
import {TuilesService} from '../services/tuiles.service'

@Injectable({
  providedIn: 'root'
})

export class GameEventService {

  public alert;
  private events = [];

  constructor(
    public alertController: AlertController,
    public persoService:PersoService,
    public tuilesService:TuilesService
    ) {
  }

  async eventBirthday(){
    const data={
      header : 'Birthday !',
      message:'Congratulations you just turned '+this.persoService.perso.age+' !. Choose a gift wisely to help you succeed !',
      buttons:[
        {
          text:'Full hunger',
          handler:()=>{
            this.persoService.perso.faim=1;
          }
        },
        {
          text:'Full health',
          handler:()=>{
            this.persoService.perso.sante=1;
          }
        },
        {
          text:'Full energy',
          handler:()=>{
            this.persoService.perso.fatigue=1;
          }
        },
        {
          text:'Some money',
          handler:()=>{
            this.persoService.perso.wallet+=Math.floor(this.tuilesService.getSalaire(this.persoService.perso.localization)/2);
          }
        }

      ]
    };
    this.presentAlert(data);
  }


  async eventAccident() {
    const dammage = 0.3;
    const careCost = 500;
    const data = {
      header: 'Accident !',
      subHeader: 'Everything was going so well until you were hit by this *** car',
      message: `Your leg is bleeding profusely and your broken arm hurts like hell...
       you will lose points of life.
       Immediate care could help you... but it is expensive`,
      buttons: [
        {
          text: 'It\'s just a scratch, it will pass',
          handler: () => {
            // TODO remove dammage to life
          }
        }, {
          text: `Pay ${careCost} healing`,
          handler: () => {
            // TODO remove dammage * (1-careEfficiency) to life
            // remove careCost to money
          }
        }
      ]
    };

    this.presentAlert(data);
  }

  // money result can be + or - to simulate a lose or a gain
  async eventLottery(moneyResult) {
    let data = {};
    if (moneyResult > 0) { // win !
      data = {
        header: 'Yoo jackpot !',
        subHeader: 'You won the lottery !',
        message: `First try, first win, well done ! You earn ${moneyResult} money.`,
        buttons: [
          {
            text: 'Thank you',
            handler: () => {
              // TODO give moneyResult
            }
          }]
      };
    } else {
      data = {
        header: 'Bad luck...',
        //subHeader: '',
        message: `By playing the lottery, you have lost .... ${moneyResult} money :-(`,
        buttons: [
          {
            text: 'Bye bye money...',
            handler: () => {
              // TODO remove moneyResult
            }
          }]
      };
    }

    this.presentAlert(data);
  }

  async eventNoMoney(){
    let data={
      header:'No money...',
      message:'You have no more money better go try and get a job.',
      buttons:[
        {
          text:'I understand',
          handler:()=>{
            //Do nothing cuz there is nothing to do with no money this is just a warning
          }
        }]
    };

    this.presentAlert(data);
  };

  async eventLost(score){
    const data={
      header:"You lose !",
      message:"You lived for "+this.persoService.perso.age+" years and managed to get a score of "+score+".",
      buttons:[
        {
          text:"Play again",
          handler:()=>{

          }
        },
        {
          text:'Leave',
          handler:()=>{

          }
        }
      ]
    };
    this.presentAlert(data);
  };

  async eventNotImplementedYet(){
    const data={
      header:'Oops!',
      message:'The action you requested hasn\'t been added yet...\nCome back later when its out.',
      buttons:[
        {
          text:'I understand',
          handler:()=>{

          }
        }

      ] 
    };
    this.presentAlert(data);

  }

  presentAlert = async (alertData) => {
    alertData.cssClass = 'custom-alert';
    alertData.mode = 'ios';
    alertData.backdropDismiss = false;
    const alert = await this.alertController.create(alertData);

    await alert.present();
  };


}
