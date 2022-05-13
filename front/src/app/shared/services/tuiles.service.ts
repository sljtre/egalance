import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TuilesService {

  private data = [
    [{
      name: 'Reykjavik',
      type: 'glace',
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
      name: 'Sao Paulo',
      type: 'herbe',
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
        habitation: 10,
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
        vide: 10
      }
    }],
    [{
      name: 'Paris',
      type: 'urbain',
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

  constructor() {
  }

  getData = (name) => {
    const data = [];
    for (const line of this.data) {
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
          const p = Math.floor((Math.random()*1000)%4);
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
    for (const line of this.data) {
      if (line[0].name === name) {
        return line[0].type;
      }
    }
  };

  chooseAleatTuile = (matrix, tuiles) => {
    const i = Math.floor(Math.random() * tuiles.length);
    for(const line of matrix){
      if(line.length!==10){
        line.push({name:tuiles[i].name});
        tuiles.splice(i, 1);
        return {mat: matrix, ref: tuiles};
      }
    }
  };
}
