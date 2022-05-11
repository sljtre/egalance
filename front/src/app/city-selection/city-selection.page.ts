import { Component, OnInit } from '@angular/core';
import {ActionSheetController} from '@ionic/angular';
import {Router} from '@angular/router';
import {PersoService} from '../shared/services/perso.service';

@Component({
  selector: 'app-city-selection',
  templateUrl: './city-selection.page.html',
  styleUrls: ['./city-selection.page.scss'],
})
export class CitySelectionPage implements OnInit {

  constructor(
    private actionSheet: ActionSheetController,
    private router: Router,
    private perso: PersoService,
  ) { }

  ngOnInit() {}

  select = async (city) => {
    const actionSheet = await this.actionSheet.create({
      header: 'Do you really want to begin in ' + city + ' ?',
      buttons: [{
        text: 'Yes',
        icon: 'airplane',
        handler: () => {
          this.perso.createPerso(city);
          this.router.navigateByUrl('/customization');
        }
      }, {
        text: 'No',
        icon: 'trash'
      }]
    });
    await actionSheet.present();
  };

}
