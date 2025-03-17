import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { LoaderComponent } from './loader/loader.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';

@NgModule({
  declarations: [RestaurantComponent, LoaderComponent, EmptyScreenComponent],
  imports: [IonicModule, CommonModule],
  exports: [RestaurantComponent, LoaderComponent, EmptyScreenComponent],
})
export class ComponentsModule {}
