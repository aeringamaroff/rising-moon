import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import restuarantList from '../../../../assets/restaurant-list.json';
import itemList from '../../../../assets/item-list.json';
import categoryList from '../../../../assets/category-list.json';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
  standalone: false,
})
export class ItemsPage implements OnInit {
  id: any;
  data: any = {};
  items: any[] = [];
  categories: any[] = [];
  restaurants: any[] = [];
  vegetarian: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.restaurants = restuarantList;
    this.items = itemList;

    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('restaurantId')) {
        this.navController.back();
        return;
      }

      this.id = paramMap.get('restaurantId');

      this.getItems();
    });
  }

  getItems() {
    this.data = {};
    this.data = this.restaurants.find((item) => item.uid === this.id);

    this.categories = categoryList.filter((item) =>
      this.data.cuisines.some((cuisine: string) => item.name.includes(cuisine))
    );
  }

  getCuisines(cuisine: any) {
    return cuisine.join(', ');
  }

  vegetarianOnly(event: any) {}
}
