import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from './directives/email.directive';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { slicePipe } from './pipes/slicePipe.pipe';
import { ErrorNotificationComponent } from './error-notification/error-notification.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [EmailDirective, MatchPasswordDirective, slicePipe, ErrorNotificationComponent, LoaderComponent],
  imports: [
    CommonModule
  ],
  exports:[EmailDirective, MatchPasswordDirective,slicePipe, ErrorNotificationComponent, LoaderComponent]
})
export class SharedModule { }
