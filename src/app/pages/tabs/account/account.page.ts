import { Component, OnInit } from '@angular/core';
import orderList from '../../../../assets/order-list.json';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false,
})
export class AccountPage implements OnInit {
  loading?: boolean;
  orders: any[] = [];
  profile: any = {};
  model = {
    icon: 'cart-outline',
    title: 'No orders found. Create one by making a purchase!',
  };

  constructor() {}

  ngOnInit() {
    this.loading = true;

    setTimeout(() => {
      this.getData();

      this.loading = false;
    }, 1000);
  }

  getData() {
    this.orders = orderList;

    this.profile = {
      name: 'Aerin',
      email: 'aerin.gamaroff@gmail.com',
      mobile: '064 961 7636',
    };
  }

  logOut() {}

  recreateOrder(event: any) {
    console.log(event);
  }

  getHelp(event: any) {
    console.log(event);

    // TODO: redirect to help page
  }
}
