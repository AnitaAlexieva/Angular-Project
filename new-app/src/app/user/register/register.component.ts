import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DOMAINS } from 'src/app/constants';
import { UserService } from 'src/app/services/user.service';
import { ErrorService } from 'src/app/shared/error-notification/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  domains = DOMAINS;
  constructor(
    private userService: UserService,
    private router: Router,
    private errorService:ErrorService
  ) { }

  register(form: NgForm) {
    if (form.invalid) return;

    const { email, password, username } = form.value;

    this.userService.register(email, password, username).subscribe({
      next: user => this.router.navigate(['/']),
      error: err => {
        this.errorService.showError('Registration failed. Please try again.')
        console.error(err)}
    });
  }

  }
