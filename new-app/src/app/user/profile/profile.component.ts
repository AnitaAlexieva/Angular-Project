import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DOMAINS } from 'src/app/constants';
import { User } from 'src/app/types/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Recipe } from 'src/app/types/Recipe';
import { ErrorService } from 'src/app/shared/error-notification/error.service';

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
    private firebaseService:FirebaseService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    const userId = this.userService.user?.uid;
    if (userId) {
      this.userService.getUserData(userId).subscribe({
        next: (user) => this.profileDetails = user,
        error: (err) => {
          console.error('Error loading user data:', err);
          this.errorService.showError('Error loading your profile data.');
        }
      });

      this.firebaseService.getRecipesByUser(userId).subscribe({
        next: (recipes) => this.myRecipes = recipes,
        error: (err) => {
          console.error('Error loading user recipes:', err);
          this.errorService.showError('Error loading your recipes.');
        }
      });
    }
  }

  onEdit(): void {
    this.showEditMode = true;
  }

   saveProfile(form: NgForm) {
    if (form.invalid || !this.userService.user?.uid) return;

    this.userService.updateUser(this.userService.user.uid, this.profileDetails).subscribe({
      next: () => {
        this.showEditMode = false;
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        this.errorService.showError('Error updating profile data.');
      }
    });
  }

  cancelEdit(event: Event) {
    event.preventDefault();
    this.showEditMode = false;
    // връщаме данните от базата
     if (this.userService.user?.uid) {
      this.userService.getUserData(this.userService.user.uid).subscribe({
        next: (user) => this.profileDetails = user,
        error: (err) => {
          console.error('Error reverting profile data:', err);
          this.errorService.showError('Error while reverting profile changes.');
        }
      });
    }
  }

  logout(){
    this.userService.logout()
    this.router.navigate(['/'])
  }

}
