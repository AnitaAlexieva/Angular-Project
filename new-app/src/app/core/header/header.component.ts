import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  get isLoggedIn():boolean{
    return this.userService.isLogged
  }

  get username():string {
    return this.userService.user?.username || '';
  }

  constructor(
    private userService: UserService,
    private router: Router
  ){}

  logout(){
    this.userService.logout()
    this.router.navigate(['/'])
  }
}
