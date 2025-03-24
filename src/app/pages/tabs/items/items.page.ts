import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
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
  storedData: any = {};
  items: any[] = [];
  categories: any[] = [];
  restaurants: any[] = [];
  cartData: any = {};
  model = {
    icon: 'fast-food-outline',
    title: 'Currently Unavailable',
  };
  vegetarian: boolean = false;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

  async getItems() {
    this.data = {};
    this.cartData = {};
    this.storedData = {};

    this.data = this.restaurants.find((item) => item.uid === this.id);

    this.categories = categoryList.filter((item) =>
      this.data.cuisines.some((cuisine: string) => item.name.includes(cuisine))
    );
    setTimeout(async () => {
      let cart = await this.getStoredData();

      if (cart?.value) {
        this.storedData = JSON.parse(cart.value);

        if (this.id === this.storedData.restaurant.uid) {
          this.items.forEach((item) => {
            this.storedData?.items.forEach((element: any) => {
              if (item.id !== element.id) {
                return;
              } else {
                item.quantity = element.quantity;
              }
            });
          });
        }

        this.cartData.totalItems = this.storedData.totalItems;
        this.cartData.totalPrice = this.storedData.totalPrice;
      }

      this.loading = false;
    }, 500);
  }

  async getStoredData() {
    return await Preferences.get({ key: 'cart' });
  }

  getCuisines(cuisine: any) {
    return cuisine.join(', ');
  }

  vegetarianOnly(event: any) {
    this.items = [];

    if (event.detail.checked === true) {
      this.items = itemList.filter((item) => item.veg === true);
    } else {
      this.items = itemList;
    }
  }

  incrementQuantity(index: number) {
    try {
      if (!this.items[index].quantity || this.items[index].quantity === 0) {
        this.items[index].quantity = 1;
      } else {
        this.items[index].quantity++;
      }

      this.calculate();
    } catch (error) {
      console.error('ERROR INCREMENTING QUANTITY', error);
    }
  }

  decreaseQuantity(index: number) {
    try {
      if (this.items[index].quantity !== 0) {
        this.items[index].quantity--;
      }

      this.calculate();
    } catch (error) {
      console.error('ERROR DECREASING QUANTITY', error);
    }
  }

  calculate() {
    let cartItem = this.items.filter((item) => item.quantity > 0);

    this.cartData.items = cartItem;

    this.cartData.totalItems = 0;
    this.cartData.totalPrice = 0;

    cartItem.forEach((item) => {
      this.cartData.totalItems += item.quantity;
      this.cartData.totalPrice +=
        parseFloat(item.price) * parseFloat(item.quantity);
    });
  }

  async viewCart() {
    if (this.cartData.items?.length > 0) await this.saveToCart();

    // this.router.navigate([this.router.url + '/cart']);
  }

  async saveToCart() {
    this.cartData.restaurant = {};
    try {
      this.cartData.restaurant = this.data;

      await Preferences.set({
        key: 'cart',
        value: JSON.stringify(this.cartData),
      });

      console.log('CART ITEMS', this.cartData);
    } catch (error) {
      console.error('ERROR SAVING TO CART', error);
    }
  }
}
