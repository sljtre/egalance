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


  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      mode: 'ios',
      backdropDismiss: false,
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['Cancel', 'Open Modal', 'Delete']
    });

    await alert.present();
  }


}
