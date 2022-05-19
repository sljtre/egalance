import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class GameEventService {

  public alert;
  private events = [];

  constructor(public alertController: AlertController) {
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


  presentAlert = async (alertData) => {
    alertData.cssClass = 'custom-alert';
    alertData.mode = 'ios';
    alertData.backdropDismiss = false;
    const alert = await this.alertController.create(alertData);

    await alert.present();
  };


}
