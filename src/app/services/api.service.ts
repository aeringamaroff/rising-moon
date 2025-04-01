import { Injectable } from '@angular/core';
import restuarantList from '../../assets/restaurant-list.json';
import itemList from '../../assets/item-list.json';
import categoryList from '../../assets/category-list.json';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  banners = [
    { banner: 'assets/shapes.svg' },
    { banner: 'assets/shapes.svg' },
    { banner: 'assets/shapes.svg' },
    { banner: 'assets/shapes.svg' },
  ];

  restaurants = restuarantList;
  items = itemList;
  categories = categoryList;

  constructor() {}
}
