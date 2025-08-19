import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';
import { ErrorService } from 'src/app/shared/error-notification/error.service';
import { Recipe } from 'src/app/types/Recipe';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
  user = this.userService.user?.uid;

  constructor(
    private firebaseService: FirebaseService,
    private userService:UserService,
    private router:Router,
    private errorService: ErrorService
  
  ){}

addTheme(form: NgForm) {
  if (form.invalid) {
    return;
  }

  if (!this.user) {
    console.error('User is not logged in!');
    return;
  }

  const preparationStr: string = form.value.preparation;
  const stepsArray: string[] = preparationStr
    .split(',')               
    .map(step => step.trim()) 
    .filter(step => step);    
  const newRecipe: Recipe = {
    title: form.value.title,
    protein: form.value.protein,
    calories: form.value.calories,
    prepTime: form.value.prepTime,
    description: form.value.description,
    steps: stepsArray,
    imageUrl: form.value.imageUrl,
    ownerId: this.user
  };

  this.firebaseService.addRecipe(newRecipe).subscribe({
    next: (res) => {
      console.log('Recipe added successfully', res);
      form.resetForm();
      this.router.navigate(['/recipes']); 
    },
    error: (err) => {
      console.error('Error adding recipe:', err);
      this.errorService.showError('Error adding recipe')
    }
  });
}

}
