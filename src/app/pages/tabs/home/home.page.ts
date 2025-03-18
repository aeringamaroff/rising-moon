import { Component, OnInit } from '@angular/core';

import restuarantList from '../../../../assets/restaurant-list.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  banners: any[] = [];
  restaurants: any[] = [];
  loading: boolean = true;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.banners = [
        { banner: 'assets/shapes.svg' },
        { banner: 'assets/shapes.svg' },
        { banner: 'assets/shapes.svg' },
        { banner: 'assets/shapes.svg' },
      ];

      this.restaurants = restuarantList;

      this.loading = false;
    }, 500);
  }
}
