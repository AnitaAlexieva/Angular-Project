import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DOMAINS } from 'src/app/constants';
import { User } from 'src/app/types/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Recipe } from 'src/app/types/Recipe';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  domains = DOMAINS;
  showEditMode: boolean = false;
  profileDetails: User = { username: '', email: '', imageUrl: '' };
  myRecipes: Recipe[] = [];

  constructor(
    private userService: UserService,
    private router:Router,
    private firebaseService:FirebaseService
  ) {}

  ngOnInit() {
    const userId = this.userService.user?.uid;
    if (userId) {
      this.userService.getUserData(userId).subscribe(user => {
        this.profileDetails = user;

      });

       this.firebaseService.getRecipesByUser(userId).subscribe(recipes => {
        this.myRecipes = recipes;
      });
    }
  }

  onEdit(): void {
    this.showEditMode = true;
  }

  saveProfile(form: NgForm) {
    if (form.invalid || !this.userService.user?.uid) {
      return;
    }

    this.userService.updateUser(this.userService.user.uid, this.profileDetails)
      .subscribe(() => {
        this.showEditMode = false;
      });
  }

  cancelEdit(event: Event) {
    event.preventDefault();
    this.showEditMode = false;
    // връщаме данните от базата
    if (this.userService.user?.uid) {
      this.userService.getUserData(this.userService.user.uid).subscribe(user => {
        this.profileDetails = user;
      });
    }
  }

  logout(){
    this.userService.logout()
    this.router.navigate(['/'])
  }

}
