import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: '../alert/alert.component.html',
  styleUrls: ['../alert/alert.component.css']
})
export class AlertComponent {
  @Input() message;
  @Output() close = new EventEmitter<void>();

  onClose(){
    this.close.emit();  
  }
}
