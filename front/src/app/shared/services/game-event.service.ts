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


  async eventAccident(dammage, careCost, careEfficiency) {
    const data = {
      header: 'Accident !',
      subHeader: 'Everything was going so well until you were hit by this *** car',
      message: `Your leg is bleeding profusely and your broken arm hurts like hell...
       you will lose ${dammage} points of life.
       Immediate care could help you... but it is expensive`,
      buttons: [
        {
          text: 'It\'s just a scratch, it will pass',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: `Pay ${careCost} healing`,
          handler: () => {
            console.log('Confirm Ok');
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
