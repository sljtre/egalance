import {Component} from '@angular/core';
import Highcharts from 'highcharts/highmaps';
import worldMap from '@highcharts/map-collection/custom/world.geo.json';

@Component({
  selector: 'app-dev-map',
  templateUrl: './dev-map.page.html',
  styleUrls: ['./dev-map.page.scss'],
})
export class DevMapPage {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  Highcharts: typeof Highcharts = Highcharts;

  chartConstructor = 'mapChart';

  chartOptions: Highcharts.Options = {
    chart: {
      map: worldMap,
      backgroundColor: 'white',
      zoomType: 'x'
    },
    credits: {enabled: false},
    title: {
      text: ''
    },
    mapNavigation: {enabled: true},
    colorAxis: {min: 0, max: 1},
    tooltip: {
      headerFormat: '',
      pointFormat: '<b>{point.name}</b><br>Lat: {point.lat}, Lon: {point.lon}'
    },
    series: [
      {
        type: 'map',
        name: 'IDH',
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        allAreas: true,
        data: []
      }, {
        type: 'mappoint',
        name: 'Cities',
        color: 'red',
        accessibility: {
          point: {
            valueDescriptionFormat: '{xDescription}. Lat: {point.lat:.2f}, lon: {point.lon:.2f}.'
          }
        },
        data: [{
          name: 'London',
          lat: 300,
          lon: 300
        }]
      }]
  };
}
