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
  location: any = {};
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

    this.location = {
      lat: -25.792457,
      lng: 27.652519,
      address: 'Main Str, Rhodie',
    };

    if (data?.value) {
      this.model = JSON.parse(data.value);

      this.model.deliveryCharge = Number(
        (this.model.totalPrice * 0.1).toFixed(2)
      );

      this.model.finalTotal = this.model.totalPrice + this.model.deliveryCharge;
    }
  }

  calculate() {
    let cartItem = this.model.items.filter((item: any) => item.quantity > 0);

    this.model.items = cartItem;

    this.model.totalItems = 0;
    this.model.totalPrice = 0;
    this.model.deliveryCharge = 0;
    this.model.finalTotal = 0;

    cartItem.forEach((item: any) => {
      this.model.totalItems += item.quantity;
      this.model.totalPrice +=
        parseFloat(item.price) * parseFloat(item.quantity);
    });

    this.model.deliveryCharge = Number(
      (this.model.totalPrice * 0.1).toFixed(2)
    );

    this.model.finalTotal = this.model.totalPrice + this.model.deliveryCharge;

    if (this.model.totalItems <= 0) {
      Preferences.remove({ key: 'cart' });
    }
  }

  async getStoredData() {
    return await Preferences.get({ key: 'cart' });
  }

  incrementQuantity(index: number) {
    try {
      if (
        !this.model.items[index].quantity ||
        this.model.items[index].quantity === 0
      ) {
        this.model.items[index].quantity = 1;
      } else {
        this.model.items[index].quantity++;
      }

      this.calculate();
    } catch (error) {
      console.error('ERROR INCREMENTING QUANTITY', error);
    }
  }

  decreaseQuantity(index: number) {
    try {
      if (this.model.items[index].quantity !== 0) {
        this.model.items[index].quantity--;
      }

      this.calculate();
    } catch (error) {
      console.error('ERROR DECREASING QUANTITY', error);
    }
  }

  addAddress() {}

  changeAddress() {}

  async pay() {
    try {
      const data = {
        restaurant_id: this.model.restaurant.uid,
        restaurant_details: this.model.restaurant,
        order: JSON.stringify(this.model.items),
        address: this.location,
        date: this.date(),
        total: this.model.totalPrice,
        delivery: this.model.deliveryCharge,
        final_total: this.model.finalTotal,
        status: 'CREATED',
        paid: 'COD',
      };

      console.log('ORDER DATA', data);

      await Preferences.set({
        key: 'cart',
        value: JSON.stringify(data),
      });
    } catch (error) {
      console.error('ERROR INITIATING PAYMENT', error);
    }
  }

  date() {
    const formattedDate = new Date().toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formattedTime = new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
  }
}
