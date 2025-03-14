import { Component, OnInit } from '@angular/core';

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

      this.restaurants = [
        {
          cover: 'assets/shapes.svg',
          name: 'Panda Express',
          short_name: 'pandaexp',
          cuisines: ['Chinese', 'Korean'],
          rating: 3.7,
          delivery_time: 26,
          distance: 1.8,
          price: 250,
        },
        {
          cover: 'assets/shapes.svg',
          name: 'Burger Haven',
          short_name: 'burgerhaven',
          cuisines: ['American', 'Fast Food'],
          rating: 4.2,
          delivery_time: 18,
          distance: 2.3,
          price: 300,
        },
        {
          cover: 'assets/shapes.svg',
          name: 'Spice Junction',
          short_name: 'spicejunction',
          cuisines: ['Indian', 'Pakistani'],
          rating: 4.5,
          delivery_time: 32,
          distance: 3.1,
          price: 400,
        },
        {
          cover: 'assets/shapes.svg',
          name: 'Bella Italia',
          short_name: 'bellaitalia',
          cuisines: ['Italian', 'Pizza'],
          rating: 4.0,
          delivery_time: 24,
          distance: 2.7,
          price: 350,
        },
        {
          cover: 'assets/shapes.svg',
          name: 'Sushi Delight',
          short_name: 'sushidelight',
          cuisines: ['Japanese', 'Sushi'],
          rating: 4.3,
          delivery_time: 29,
          distance: 1.5,
          price: 450,
        },
      ];

      this.loading = false;
    }, 3000);
  }
}
