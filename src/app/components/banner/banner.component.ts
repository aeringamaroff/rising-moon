import { Component, Input, OnInit } from '@angular/core';

import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  standalone: false,
})
export class BannerComponent implements OnInit {
  swiperModules = [IonicSlides];

  @Input() bannerImages: any[] | undefined;

  constructor() {}

  ngOnInit() {}
}
