import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DOMAINS } from 'src/app/constants';
import { UserService } from 'src/app/services/user.service';
import { ErrorService } from 'src/app/shared/error-notification/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  domains = DOMAINS;

  constructor(
    private userService: UserService,
    private router: Router,
    private errorService: ErrorService
  ) {}

  login(form: NgForm) {
    if (form.invalid) return;

    const { email, password } = form.value;

    this.userService.login(email, password).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        console.error('Login failed:', err);
        this.errorService.showError('Login failed. Please check your email and password.');
      }
    });
  }
}
