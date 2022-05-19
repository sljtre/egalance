import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(
    private router: Router,
  ) {}

  redirect = (url) => {
    this.router.navigateByUrl('/' + url);
  };
}
