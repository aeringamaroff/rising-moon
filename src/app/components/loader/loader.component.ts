import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: false,
})
export class LoaderComponent implements OnInit {
  index = Array(4);

  constructor() {}

  ngOnInit() {}
}
