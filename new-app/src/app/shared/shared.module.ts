import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from './directives/email.directive';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { slicePipe } from './pipes/slicePipe.pipe';



@NgModule({
  declarations: [EmailDirective, MatchPasswordDirective, slicePipe],
  imports: [
    CommonModule
  ],
  exports:[EmailDirective, MatchPasswordDirective,slicePipe]
})
export class SharedModule { }
