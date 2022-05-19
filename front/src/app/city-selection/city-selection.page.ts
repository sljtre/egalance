import { Component, OnInit } from '@angular/core';
import {ActionSheetController} from '@ionic/angular';
import {Router} from '@angular/router';
import {PersoService} from '../shared/services/perso.service';
import {TuilesService} from '../shared/services/tuiles.service';
import Highcharts from 'highcharts/highmaps';
import worldMap from '@highcharts/map-collection/custom/world.geo.json';

@Component({
  selector: 'app-city-selection',
  templateUrl: './city-selection.page.html',
  styleUrls: ['./city-selection.page.scss'],
})
export class CitySelectionPage implements OnInit {

  public cityName = '';
  public ethnie = '';
  public religion = '';
  public population = '';
  public difficulty = '';

  constructor(
    private actionSheet: ActionSheetController,
    public router: Router,
    public perso: PersoService,
    private tuiles: TuilesService,
  ) { }

  ngOnInit() {}

  setInfos = (name) => {
    this.cityName = name;
    this.ethnie = this.tuiles.getEthnie(name);
    this.religion = this.tuiles.getReligion(name);
    this.population = this.tuiles.getPopulation(name);
    this.difficulty = this.tuiles.getDifficulty(name);
    console.log('./assets/img/persos/skin'+this.ethnie+'-'+'homme-'+this.religion+'.png');
  };

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  chartData = [{ code3: "ABW", z: 105 }, { code3: "AFG", z: 35530 }];

  chartOptions: Highcharts.Options = {
    chart: {
      map: worldMap,
      backgroundColor:'transparent',
      width:1200,
      height:600
    },
    title: {
      text: ''
    },
    mapNavigation: {
      enabled: false,
    },
    legend: {
      enabled: true
    },
    credits: {
      enabled: false
    },
    colorAxis: {
      min: 0,
      max:1,
    },
    series: [
      {
        type: "map",
        name: "IDH",
        states: {
          hover: {
            color: "#001069"
          }
        },
        dataLabels: {
          enabled: false
        },
        allAreas: false,
        data: [
          ['um', 0.926],
          ['us', 0.926],
          ['jp', 0.919],
          ['sc', 0.801],
          ['in', 0.647],
          ['fr', 0.901],
          ['fm', 0.614],
          ['cn', 0.761],
          ['pt', 0.850],
          ['sh', 0.797],
          ['br', 0.765],
          ['ki', 0.623],
          ['ph', 0.718],
          ['mx', 0.767],
          ['es', 0.893],
          ['mv', 0.719],
          ['gb', 0.920],
          ['gr', 0.872],
          ['as', 0.827],
          ['dk', 0.930],
          ['gl', 0.839],
          ['mp', 0.875],
          ['vi', 0.894],
          ['ca', 0.929],
          ['st', 0.609],
          ['cv', 0.651],
          ['dm', 0.724],
          ['nl', 0.944],
          ['jm', 0.726],
          ['ws', 0.707],
          ['om', 0.834],
          ['vc', 0.738],
          ['tr', 0.806],
          ['bd', 0.614],
          ['lc', 0.745],
          ['nr', 0.721],
          ['no', 0.954],
          ['bh', 0.838],
          ['to', 0.717],
          ['fi', 0.925],
          ['id', 0.707],
          ['mu', 0.804],
          ['se', 0.945],
          ['tt', 0.799],
          ['my', 0.804],
          ['pa', 0.795],
          ['tv', 0.711],
          ['mh', 0.698],
          ['cl', 0.847],
          ['th', 0.765],
          ['gd', 0.763],
          ['ee', 0.882],
          ['ag', 0.776],
          ['tw', 0.907],
          ['bb', 0.814],
          ['it', 0.883],
          ['mt', 0.885],
          ['vu', 0.597],
          ['sg', 0.935],
          ['cy', 0.873],
          ['lk', 0.780],
          ['km', 0.538],
          ['fj', 0.724],
          ['ru', 0.824],
          ['sm', 0.961],
          ['kz', 0.825],
          ['az', 0.754],
          ['tj', 0.656],
          ['ls', 0.518],
          ['uz', 0.710],
          ['ma', 0.676],
          ['co', 0.761],
          ['tl', 0.626],
          ['tz', 0.529],
          ['ar', 0.830],
          ['sa', 0.857],
          ['pk', 0.560],
          ['ye', 0.463],
          ['ae', 0.866],
          ['ke', 0.579],
          ['pe', 0.777],
          ['do', 0.745],
          ['ht', 0.510],
          ['pg', 0.543],
          ['ao', 0.574],
          ['kh', 0.581],
          ['vn', 0.693],
          ['mz', 0.446],
          ['cr', 0.794],
          ['bj', 0.545],
          ['ng', 0.534],
          ['ir', 0.797],
          ['sv', 0.667],
          ['sl', 0.452],
          ['gw', 0.461],
          ['hr', 0.837],
          ['bz', 0.720],
          ['za', 0.705],
          ['cf', 0.381],
          ['sd', 0.510],
          ['cd', 0.459],
          ['kw', 0.808],
          ['de', 0.947],
          ['be', 0.919],
          ['ie', 0.942],
          ['kp', 0.733],
          ['kr', 0.916],
          ['gy', 0.670],
          ['hn', 0.634],
          ['mm', 0.583],
          ['ga', 0.702],
          ['gq', 0.588],
          ['ni', 0.651],
          ['lv', 0.854],
          ['ug', 0.528],
          ['mw', 0.485],
          ['am', 0.760],
          ['sx', 0.702],
          ['tm', 0.710],
          ['zm', 0.584],
          ['mr', 0.527],
          ['dz', 0.759],
          ['lt', 0.869],
          ['et', 0.470],
          ['er', 0.434],
          ['gh', 0.596],
          ['si', 0.902],
          ['gt', 0.651],
          ['ba', 0.769],
          ['jo', 0.723],
          ['sy', 0.549],
          ['mc', 0.956],
          ['al', 0.791],
          ['uy', 0.808],
          ['mn', 0.735],
          ['rw', 0.536],
          ['so', 0.364],
          ['bo', 0.703],
          ['cm', 0.563],
          ['cg', 0.608],
          ['rs', 0.799],
          ['me', 0.816],
          ['tg', 0.515],
          ['la', 0.604],
          ['af', 0.496],
          ['ua', 0.779],
          ['sk', 0.857],
          ['bg', 0.816],
          ['qa', 0.848],
          ['li', 0.917],
          ['at', 0.914],
          ['sz', 0.608],
          ['hu', 0.845],
          ['ro', 0.816],
          ['ne', 0.394],
          ['lu', 0.916],
          ['ad', 0.857],
          ['ci', 0.516],
          ['lr', 0.465],
          ['bn', 0.845],
          ['iq', 0.689],
          ['ge', 0.812],
          ['gm', 0.466],
          ['ch', 0.946],
          ['td', 0.398],
          ['lb', 0.730],
          ['dj', 0.495],
          ['bi', 0.423],
          ['sr', 0.724],
          ['il', 0.919],
          ['ml', 0.434],
          ['sn', 0.512],
          ['gn', 0.466],
          ['zw', 0.563],
          ['pl', 0.872],
          ['mk', 0.759],
          ['py', 0.724],
          ['by', 0.817],
          ['bf', 0.434],
          ['na', 0.645],
          ['ly', 0.708],
          ['tn', 0.739],
          ['bt', 0.617],
          ['md', 0.711],
          ['ss', 0.413],
          ['bw', 0.728],
          ['bs', 0.805],
          ['nz', 0.921],
          ['cu', 0.778],
          ['ec', 0.759],
          ['au', 0.944],
          ['ve', 0.726],
          ['sb', 0.557],
          ['mg', 0.521],
          ['is', 0.938],
          ['eg', 0.700],
          ['kg', 0.697],
          ['np', 0.579],
        ]
      }
    ]
  };

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
