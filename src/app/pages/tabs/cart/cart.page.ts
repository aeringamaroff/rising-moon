import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage implements OnInit {
  isItemCart: boolean = false;
  restaurantId?: string;
  instructions?: string;
  model: any = {};
  prevUrl? = 'tabs/restaurants/';
  deliveryCharge = 0;

  constructor(private router: Router) {}

  async ngOnInit() {
    const currentNav = this.router.getCurrentNavigation();
    if (currentNav) {
      if (currentNav.extras.state?.['isItemCart']) {
        this.isItemCart = true;
        this.prevUrl = this.prevUrl + currentNav.extras.state['restaurantId'];
      }
    }

    this.getCart();
  }

  async getCart() {
    let data = await this.getStoredData();

    if (data?.value) {
      this.model = JSON.parse(data.value);

      this.calculate();
    }
  }

  calculate() {
    this.model.deliveryCharge = Number(
      (this.model.totalPrice * 0.1).toFixed(2)
    );

    this.model.finalTotal = this.model.totalPrice + this.model.deliveryCharge;
  }

  async getStoredData() {
    return await Preferences.get({ key: 'cart' });
  }

  decreaseQuantity(index: number) {
    try {
    } catch (error) {
      console.error('ERROR DECREASING QUANTITY', error);
    }
  }

  incrementQuantity(index: number) {
    try {
    } catch (error) {
      console.error('ERROR INCREMENTING QUANTITY', error);
    }
  }

  addAddress() {}

  changeAddress() {}

  pay() {}
}
