import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DOMAINS } from 'src/app/constants';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  domains = DOMAINS;
  constructor(
    private userService: UserService,
    private router:Router
  ){}

login(form: NgForm) {
  if (form.invalid) return;

  const { email, password } = form.value;

 this.userService.login(email, password).subscribe({
  next: () => this.router.navigate(['/']),
  error: err => console.error(err)
});
}

}
