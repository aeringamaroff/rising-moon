import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [RestaurantComponent, LoaderComponent],
  imports: [IonicModule, CommonModule],
  exports: [RestaurantComponent, LoaderComponent],
})
export class ComponentsModule {}
