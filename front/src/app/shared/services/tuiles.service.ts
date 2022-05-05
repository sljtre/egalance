import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TuilesService {

  private data = [
    [{name: 'Reykjavik', tuiles: {hopital: 4, supermarche: 2, ecole: 3, ecoleSup: 1, cinema: 1, bar: 2, religion: 1, justice: 1, mairie: 1, culturel: 1, parc: 1, habitations: 7, bureaux: 2, usine: 1, ferme: 0, bibliotheque: 1, gymnase: 1, musee: 1, restaurant: 1, banque: 1, stade: 1, aeroport: 1, vide: 15}}],
    [{name: 'New York', tuiles: {hopital: 3, supermarche: 4, ecole: 3, ecoleSup: 1, cinema:3, bar:3, religion:1, justice: 1, mairie: 1, culturel: 1, parc: 2, habitations: 9, bureaux: 3, usine: 1, ferme: 0, bibliotheque: 1, gymnase: 1, musee: 1, restaurant: 1, banque: 1, stade: 1, aeroport: 1,vide:7}}],
    [{name: 'Sydney', tuiles: {hopital: 4, supermarche: 3, ecole: 2, ecoleSup: 1, cinema:1, bar:3, religion:1, justice: 1, mairie: 1, culturel: 1, parc: 4, habitations: 13, bureaux: 4, usine: 2, ferme: 1, bibliotheque: 2, gymnase: 1, musee: 1, restaurant: 1, banque: 1, stade: 1, aeroport: 1,vide:0}}],
    [{name: 'Sao Paulo', tuiles: {hopital: 2, supermarche: 2, ecole: 2, ecoleSup: 1, cinema:1, bar:2, religion:1, justice: 1, mairie: 1, culturel: 1, parc: 2, habitations: 10, bureaux: 3, usine: 1, ferme: 1, bibliotheque: 2, gymnase: 1, musee: 1, restaurant: 2, banque: 1, stade: 1, aeroport: 1,vide:10}}],
    [{name: 'Paris', tuiles: {hopital: 3, supermarche: 3, ecole: 2, ecoleSup: 1, cinema:2, bar:4, religion:1, justice: 1, mairie: 1, culturel: 1, parc: 2, habitations: 5, bureaux: 3, usine: 1, ferme: 0, bibliotheque: 1, gymnase: 1, musee: 1, restaurant: 2, banque: 1, stade: 1, aeroport: 1,vide:12}}],
    [{name: 'Moscou', tuiles: {hopital: 4, supermarche: 2, ecole: 3, ecoleSup: 1, cinema:2, bar:3, religion:1, justice: 1, mairie: 1, culturel: 1, parc: 2, habitations: 11, bureaux: 3, usine: 2, ferme: 1, bibliotheque: 2, gymnase: 1, musee: 1, restaurant: 2, banque: 1, stade: 1, aeroport: 1,vide:3}}],
    [{name: 'New Delhi', tuiles: {hopital: 1, supermarche: 2, ecole: 1, ecoleSup: 1, cinema:3, bar:1, religion:1, justice: 1, mairie: 1, culturel: 1, parc: 3, habitations: 8, bureaux: 2, usine: 1, ferme: 2, bibliotheque: 1, gymnase: 0, musee: 1, restaurant: 1, banque: 1, stade: 1, aeroport: 1,vide:15}}],
    [{name: 'Ouagadougou', tuiles: {hopital: 0, supermarche: 1, ecole: 1, ecoleSup: 0, cinema:0, bar:3, religion:1, justice: 1, mairie: 1, culturel: 1, parc: 1, habitations: 8, bureaux: 1, usine: 1, ferme: 2, bibliotheque: 0, gymnase: 0, musee: 1, restaurant: 1, banque: 0, stade: 1, aeroport: 1,vide:24}}]
  ];

  constructor() { }

  getData = (name) => {
    for(const line of this.data){
      if(line[0].name===name){
        return line[0].tuiles;
      }
    }
  };
}
