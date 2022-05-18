import {Injectable} from '@angular/core';
import {PersoService} from './perso.service';

@Injectable({
  providedIn: 'root'
})
export class TuilesService {

  private cities = [
    [{
      name: 'Reykjavik',
      type: 'glace',
      religion:'christianisme',
      ethnie:'5',
      inhabitants: '122 853',
      difficulty: '0.63',
      tuiles: {
        hopital: 4,
        supermarche: 2,
        ecole: 3,
        ecoleSup: 1,
        cinema: 1,
        bar: 2,
        religion: 1,
        justice: 1,
        mairie: 1,
        culturel: 1,
        parc: 1,
        habitation: 7,
        bureaux: 2,
        usine: 1,
        ferme: 0,
        bibliotheque: 1,
        gymnase: 1,
        musee: 1,
        restaurant: 1,
        banque: 1,
        stade: 1,
        aeroport: 1,
        vide: 15
      }
    }],
    [{
      name: 'New York',
      type: 'urbain',
      religion:'christianisme',
      ethnie:'4',
      inhabitants: '8 389 581',
      difficulty: '0.29',
      tuiles: {
        hopital: 3,
        supermarche: 4,
        ecole: 3,
        ecoleSup: 1,
        cinema: 3,
        bar: 3,
        religion: 1,
        justice: 1,
        mairie: 1,
        culturel: 1,
        parc: 2,
        habitation: 9,
        bureaux: 3,
        usine: 1,
        ferme: 0,
        bibliotheque: 1,
        gymnase: 1,
        musee: 1,
        restaurant: 1,
        banque: 1,
        stade: 1,
        aeroport: 1,
        vide: 7
      }
    }],
    [{
      name: 'Sydney',
      type: 'sable',
      religion:'christianisme',
      ethnie:'4',
      inhabitants: '5 312 947',
      difficulty: '0',
      tuiles: {
        hopital: 4,
        supermarche: 3,
        ecole: 2,
        ecoleSup: 1,
        cinema: 1,
        bar: 3,
        religion: 1,
        justice: 1,
        mairie: 1,
        culturel: 1,
        parc: 4,
        habitation: 13,
        bureaux: 4,
        usine: 2,
        ferme: 1,
        bibliotheque: 2,
        gymnase: 1,
        musee: 1,
        restaurant: 1,
        banque: 1,
        stade: 1,
        aeroport: 1,
        vide: 0
      }
    }],
    [{
      name: 'Rio de Janeiro',
      type: 'herbe',
      religion:'christianisme',
      ethnie:'2',
      inhabitants: '6 748 518',
      difficulty: '0.46',
      tuiles: {
        hopital: 2,
        supermarche: 2,
        ecole: 2,
        ecoleSup: 1,
        cinema: 1,
        bar: 2,
        religion: 1,
        justice: 1,
        mairie: 1,
        culturel: 1,
        parc: 2,
        habitation: 9,
        bureaux: 3,
        usine: 1,
        ferme: 1,
        bibliotheque: 2,
        gymnase: 1,
        musee: 1,
        restaurant: 2,
        banque: 1,
        stade: 1,
        aeroport: 1,
        vide: 11
      }
    }],
    [{
      name: 'Paris',
      type: 'urbain',
      religion:'atheisme',
      ethnie:'5',
      inhabitants: '2 161 063',
      difficulty: '0.5',
      tuiles: {
        hopital: 3,
        supermarche: 3,
        ecole: 2,
        ecoleSup: 1,
        cinema: 2,
        bar: 4,
        religion: 1,
        justice: 1,
        mairie: 1,
        culturel: 1,
        parc: 2,
        habitation: 5,
        bureaux: 3,
        usine: 1,
        ferme: 0,
        bibliotheque: 1,
        gymnase: 1,
        musee: 1,
        restaurant: 2,
        banque: 1,
        stade: 1,
        aeroport: 1,
        vide: 12
      }
    }],
    [{
      name: 'Moscow',
      type: 'glace',
      religion:'christianisme',
      ethnie:'4',
      inhabitants: '11 921 683',
      difficulty: '0.13',
      tuiles: {
        hopital: 4,
        supermarche: 2,
        ecole: 3,
        ecoleSup: 1,
        cinema: 2,
        bar: 3,
        religion: 1,
        justice: 1,
        mairie: 1,
        culturel: 1,
        parc: 2,
        habitation: 11,
        bureaux: 3,
        usine: 2,
        ferme: 1,
        bibliotheque: 2,
        gymnase: 1,
        musee: 1,
        restaurant: 2,
        banque: 1,
        stade: 1,
        aeroport: 1,
        vide: 3
      }
    }],
    [{
      name: 'New Delhi',
      type: 'herbe',
      religion:'islam',
      ethnie:'2',
      inhabitants: '32 066 901',
      difficulty: '0.63',
      tuiles: {
        hopital: 1,
        supermarche: 2,
        ecole: 1,
        ecoleSup: 1,
        cinema: 3,
        bar: 1,
        religion: 1,
        justice: 1,
        mairie: 1,
        culturel: 1,
        parc: 3,
        habitation: 8,
        bureaux: 2,
        usine: 1,
        ferme: 2,
        bibliotheque: 1,
        gymnase: 0,
        musee: 1,
        restaurant: 1,
        banque: 1,
        stade: 1,
        aeroport: 1,
        vide: 15
      }
    }],
    [{
      name: 'Ouagadougou',
      type: 'sable',
      religion:'islam',
      ethnie:'1',
      inhabitants: '2 453 117',
      difficulty: '1',
      tuiles: {
        hopital: 0,
        supermarche: 1,
        ecole: 1,
        ecoleSup: 0,
        cinema: 0,
        bar: 3,
        religion: 1,
        justice: 1,
        mairie: 1,
        culturel: 1,
        parc: 1,
        habitation: 8,
        bureaux: 1,
        usine: 1,
        ferme: 2,
        bibliotheque: 0,
        gymnase: 0,
        musee: 1,
        restaurant: 1,
        banque: 0,
        stade: 1,
        aeroport: 1,
        vide: 24
      }
    }],
    [{
      name: 'Johannesburg',
      type: 'sable',
      religion:'christianisme',
      ethnie:'3',
      inhabitants: '5 635 092',
      difficulty: '0.46',
      tuiles: {
        hopital: 1,
        supermarche: 3,
        ecole: 1,
        ecoleSup: 1,
        cinema: 1,
        bar: 2,
        religion: 1,
        justice: 1,
        mairie: 1,
        culturel: 1,
        parc: 2,
        habitation: 10,
        bureaux: 2,
        usine: 2,
        ferme: 1,
        bibliotheque: 2,
        gymnase: 1,
        musee: 1,
        restaurant: 2,
        banque: 1,
        stade: 1,
        aeroport: 1,
        vide: 11
      }
    }],
    [{
      name: 'Beijing',
      type: 'urbain',
      religion:'atheisme',
      ethnie:'3',
      inhabitants: '21 546 210',
      difficulty: '0',
      tuiles: {
        hopital: 2,
        supermarche: 2,
        ecole: 2,
        ecoleSup: 1,
        cinema: 3,
        bar: 2,
        religion: 1,
        justice: 1,
        mairie: 1,
        culturel: 1,
        parc: 3,
        habitation: 15,
        bureaux: 3,
        usine: 3,
        ferme: 1,
        bibliotheque: 2,
        gymnase: 1,
        musee: 1,
        restaurant: 2,
        banque: 1,
        stade: 1,
        aeroport: 1,
        vide: 0
      }
    }]
  ];
  public tuiles = [
    [{
      name: 'Hospital',
      labels: ['hopital'],
      description: '    Come here to heal yourself or to work as a doctor',
      actions: ['Heal', 'Work']
    }],
    [{
      name: 'School',
      labels: ['ecole'],
      description: 'Study in order to get better jobs or work here as a teacher',
      actions: ['Study', 'Work']
    }],
    [{
      name: 'College',
      labels: ['ecoleSup'],
      description: 'Learn advanced knowledge or work here as a senior teacher',
      actions: ['Study', 'Work']
    }],
    [{
      name: 'Supermarket',
      labels: ['supermarche'],
      description: 'You can buy a bunch of different articles in the supermarket or work as a cashier',
      actions: ['Shopping', 'Work']
    }],
    [{
      name: 'Cinema',
      labels: ['cinema'],
      description: 'Relax yourself and release the pressure by watching a movie or work as a cleaner.',
      actions: ['Watch', 'Work']
    }],
    [{
      name: 'Bar',
      labels: ['bar'],
      description: 'You can eat at the bar and drink a mysterious yellow drink, but beware of its effects ! Servers can be employed',
      actions: ['Drink', 'Eat', 'Work']
    }],
    [{
      name: 'Religion',
      labels: ['religion'],
      description: ' Come to repent and confess to your God by praying',
      actions: ['Pray']
    }], //work ?
    [{
      name: 'Justice',
      labels: ['justice'],
      description: 'Judge or be judged',
      actions: ['Work']
    }], //se défendre ? donc truc illégaux ?
    [{
      name: 'Town hall',
      labels: ['mairie'],
      description: 'Carry out your administrative procedures or try to become the respectful mayor',
      actions: ['Mary', 'Rent', 'Work']
    }],
    [{
      name: 'Parc',
      labels: ['parc'],
      description: 'Take a walk to get some fresh air ',
      actions: ['Rest']
    }],
    [{
      name: 'House',
      labels: ['habitation0', 'habitation1', 'habitation2', 'habitation3'],
      description: 'You can make this house your home',
      actions: ['Rest', 'Pray', 'Eat']
    }],
    [{
      name: 'Office',
      labels: ['bureaux'],
      description: 'The office allows you to work ',
      actions: ['Work']
    }],
    [{
      name: 'Factory',
      labels: ['usine'],
      description: 'There are some factory worker jobs ',
      actions: ['Work']
    }],
    [{
      name: 'Farm',
      labels: ['ferme'],
      description: 'Find fresh healthy food from the farm, or get on the tractor to plow the fields ',
      actions: ['Eat', 'Work']
    }],
    [{
      name: 'Library',
      labels: ['bibliotheque'],
      description: 'The library is the place of all knowledge ',
      actions: ['Study', 'Work']
    }],
    [{
      name: 'Gymnasium',
      labels: ['gymnase'],
      description: 'Get fit to remain healthy or coach some sportsmen',
      actions: ['Practice', 'Work']
    }],
    [{
      name: 'Museum',
      labels: ['musee'],
      description: 'What is art? Come to the museum to get your answer ',
      actions: ['Rest', 'Study', 'Work']
    }],
    [{
      name: 'Restaurant',
      labels: ['restaurant'],
      description: 'Have a meal here or work as a cook with the chief "Paul" ',
      actions: ['Eat', 'Work']
    }],
    [{
      name: 'Bank',
      labels: ['banque'],
      description: 'Put your money in the bank for safekeeping',
      actions: ['Deposit', 'Pull', 'Work']
    }],
    [{
      name: 'Stadium',
      labels: ['stade'],
      description: 'Play with a sport team, watch a match or work as a security guard ',
      actions: ['Practice', 'Rest', 'Work']
    }],
    [{
      name: 'Airport',
      labels: ['aeroport'],
      description: 'the airport opens the field of possibilities for you ',
      actions: ['Travel', 'Work']
    }],
    [{
      name: 'Empty',
      labels: ['vide'],
      description: 'There is not much to see here ',
      actions: ['Rest']
    }],
    [{
      name: ' Hallgriùskirja',
      labels: ['Reykjavik'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      actions: ['Rest']
    }],
    [{
      name: 'Statue of Liberty',
      labels: ['New York'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      actions: ['Rest']
    }],
    [{
      name: 'Opera House',
      labels: ['Sydney'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      actions: ['Rest']
    }],
    [{
      name: 'Christ the Redeemer',
      labels: ['Rio de Janeiro'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      actions: ['Rest']
    }],
    [{
      name: 'Eiffel Tower',
      labels: ['Paris'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      actions: ['Rest']
    }],
    [{
      name: 'Saint Basil\'s Cathedral',
      labels: ['Moscow'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      actions: ['Rest']
    }],
    [{
      name: 'India Gate',
      labels: ['New Delhi'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      actions: ['Rest']
    }],
    [{
      name: 'Ouagadougou\' Cathedrale',
      labels: ['Ouagadougou'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      actions: ['Rest']
    }],
    [{
      name: 'Voortrekker Monument',
      labels: ['Johannesburg'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      actions: ['Rest']
    }],
    [{
      name: 'Great Wall of China',
      labels: ['Beijing'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      actions: ['Rest']
    }],
  ];

  constructor(
    private perso: PersoService
  ) {}

  getData = (name) => {
    const data = [];
    for (const line of this.cities) {
      if (line[0].name === name) {
        for (let i = 0; i < line[0].tuiles.hopital; i++) {
          data.push({name: 'hopital'});
        }
        for (let i = 0; i < line[0].tuiles.supermarche; i++) {
          data.push({name: 'supermarche'});
        }
        for (let i = 0; i < line[0].tuiles.ecole; i++) {
          data.push({name: 'ecole'});
        }
        for (let i = 0; i < line[0].tuiles.ecoleSup; i++) {
          data.push({name: 'ecoleSup'});
        }
        for (let i = 0; i < line[0].tuiles.cinema; i++) {
          data.push({name: 'cinema'});
        }
        for (let i = 0; i < line[0].tuiles.bar; i++) {
          data.push({name: 'bar'});
        }
        for (let i = 0; i < line[0].tuiles.parc; i++) {
          data.push({name: 'parc'});
        }
        for (let i = 0; i < line[0].tuiles.habitation; i++) {
          const p = Math.floor((Math.random() * 1000) % 4);
          data.push({name: 'habitation' + p});
        }
        for (let i = 0; i < line[0].tuiles.bureaux; i++) {
          data.push({name: 'bureaux'});
        }
        for (let i = 0; i < line[0].tuiles.usine; i++) {
          data.push({name: 'usine'});
        }
        for (let i = 0; i < line[0].tuiles.ferme; i++) {
          data.push({name: 'ferme'});
        }
        for (let i = 0; i < line[0].tuiles.bibliotheque; i++) {
          data.push({name: 'bibliotheque'});
        }
        for (let i = 0; i < line[0].tuiles.gymnase; i++) {
          data.push({name: 'gymnase'});
        }
        for (let i = 0; i < line[0].tuiles.musee; i++) {
          data.push({name: 'musee'});
        }
        for (let i = 0; i < line[0].tuiles.restaurant; i++) {
          data.push({name: 'restaurant'});
        }
        for (let i = 0; i < line[0].tuiles.banque; i++) {
          data.push({name: 'banque'});
        }
        for (let i = 0; i < line[0].tuiles.stade; i++) {
          data.push({name: 'stade'});
        }
        for (let i = 0; i < line[0].tuiles.vide; i++) {
          data.push({name: 'vide'});
        }
      }
    }
    return data;
  };

  getType = (name) => {
    for (const line of this.cities) {
      if (line[0].name === name) {
        return line[0].type;
      }
    }
  };

  getReligion = (name) => {
    for (const line of this.cities) {
      if (line[0].name === name) {
        return line[0].religion;
      }
    }
  };

  getEthnie = (name) => {
    for (const line of this.cities) {
      if (line[0].name === name) {
        return line[0].ethnie;
      }
    }
  };

  chooseAleatTuile = (matrix, tuiles) => {
    const i = Math.floor(Math.random() * tuiles.length);
    let row = 0;
    let col = 0;
    for (const line of matrix) {
      if (line.length !== 10) {
        col = line.length;
        line.push({name: tuiles[i].name, top: 64 * row, left: (row % 2) * 36 + 73 * col, type: this.getType(this.perso.perso.localization)});
        tuiles.splice(i, 1);
        return {mat: matrix, ref: tuiles};
      } else {
        row += 1;
      }
    }
  };

  getInfo = (label) => {
    for (const line of this.tuiles) {
      for (const el of line[0].labels) {
        if (el === label) {
          return {name: line[0].name, description: line[0].description, actions: line[0].actions};
        }
      }
    }
  }

  getActions = (name) => {
    let tmp = '';
    for(const line of this.tuiles){
      if(line[0].name===name){
        for(const el of line[0].actions){
          tmp+=el + ' ';
          console.log(el);
        }
      }
    }
    return tmp;
  };

  getPopulation = (name) => {
    for(const line of this.cities){
      if(line[0].name === name){
        return line[0].inhabitants;
      }
    }
  };

  getDifficulty = (name) => {
    for(const line of this.cities){
      if(line[0].name === name){
        return line[0].difficulty;
      }
    }
  };
}
