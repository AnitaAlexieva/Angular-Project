import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from './directives/email.directive';
import { MatchPasswordDirective } from './directives/match-password.directive';



@NgModule({
  declarations: [EmailDirective, MatchPasswordDirective],
  imports: [
    CommonModule
  ],
  exports:[EmailDirective, MatchPasswordDirective]
})
export class SharedModule { }
