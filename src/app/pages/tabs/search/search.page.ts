import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false,
})
export class SearchPage implements OnInit {
  @ViewChild('searchbar') searchInput: any;

  loading?: boolean;
  allRestaurants: any[] = [];
  restaurants: any[] = [];
  query: any;
  model: any = {
    icon: 'search-outline',
    title: 'No Results Found',
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    setTimeout(() => {
      this.allRestaurants = this.apiService.restaurants;
      this.restaurants = this.allRestaurants;

      this.searchInput.setFocus();
    }, 500);
  }

  onSearch(event: any): any {
    this.loading = true;

    this.query = event.detail.value.toLowerCase();

    if (this.query?.length > 0) {
      setTimeout(async () => {
        this.restaurants = this.allRestaurants.filter((element: any) => {
          return (
            element.short_name.includes(this.query) ||
            element.cuisines.some((cuisine: any) =>
              cuisine.toLowerCase().includes(this.query.toLowerCase())
            )
          );
        });
        this.loading = false;
      }, 500);
    } else if (this.query?.length === 0) {
      this.loading = false;
      return (this.restaurants = this.allRestaurants);
    }
  }
}
