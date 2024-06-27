import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-my-button',
  standalone: true,
  imports: [],
  templateUrl: './my-button.component.html',
  styleUrl: './my-button.component.css'
})
export class MyButtonComponent {
  @Output() myClick = new EventEmitter<void>();

  onClick():void{
    this.myClick.emit();
  }
}
