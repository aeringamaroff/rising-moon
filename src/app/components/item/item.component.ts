import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  standalone: false,
})
export class ItemComponent implements OnInit {
  @Input() item: any;
  @Input() index: any;
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  incrementQuantity() {
    this.add.emit(this.index);
  }

  decreaseQuantity() {
    this.remove.emit(this.index);
  }
}
