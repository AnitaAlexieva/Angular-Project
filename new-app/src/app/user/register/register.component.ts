import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DOMAINS } from 'src/app/constants';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    domains = DOMAINS;
    constructor(
      private userService: UserService,
      private router: Router
    ){}

    register(form:NgForm){
      if(form.invalid){
        return;
      }

      console.log('Само стойностите:', form.value);
    }
}
