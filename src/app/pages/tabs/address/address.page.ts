import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
  standalone: false,
})
export class AddressPage implements OnInit {
  loading: boolean = true;
  addresses: any[] = [];

  constructor() {}

  async ngOnInit() {
    await this.getAddresses();
  }

  async getAddresses() {
    setTimeout(() => {
      this.addresses = [
        {
          title: 'Home',
          lat: -26.2041,
          lng: 28.0473,
          address: '123 Elm Street, Johannesburg',
          number: '+27 82 123 4567',
          id: 'ui4fhnkd1',
        },
        {
          title: 'Work',
          lat: -26.2023,
          lng: 28.0456,
          address: '456 Business Ave, Sandton',
          number: '+27 11 987 6543',
          id: 'u1200id2',
        },
        {
          title: 'Second House',
          lat: -26.2075,
          lng: 28.0501,
          address: '789 Willow Road, Randburg',
          number: '+27 72 555 7890',
          id: 'mjk85uid3',
        },
      ];

      this.loading = false;
    }, 500);
  }

  editAddress() {}

  deleteAddress() {}
}
