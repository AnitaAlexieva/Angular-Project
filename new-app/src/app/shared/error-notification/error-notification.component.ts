import { Component } from '@angular/core';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.css']
})
export class ErrorNotificationComponent {
   constructor(public errorService: ErrorService) {}
}
