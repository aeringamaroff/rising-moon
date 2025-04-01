import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

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

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    setTimeout(() => {
      this.restaurants = this.apiService.restaurants;
      this.banners = this.apiService.banners;

      this.loading = false;
    }, 500);
  }
}
