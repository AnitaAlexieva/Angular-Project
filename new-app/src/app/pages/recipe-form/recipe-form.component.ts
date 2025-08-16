import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';
import { Recipe } from 'src/app/types/Recipe';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
  onEditMode:boolean = false;
  user = this.userService.user?.uid;

  constructor(
    private firebaseService: FirebaseService,
    private userService:UserService,
    private router:Router
  ){}

addTheme(form: NgForm) {
  if (form.invalid) {
    return;
  }

  if (!this.user) {
    console.error('User is not logged in!');
    return;
  }

  // Взимаме текста от полето за подготовка и го разделяме по запетайка
  const preparationStr: string = form.value.preparation;
  const stepsArray: string[] = preparationStr
    .split(',')                // разделяне на запетайки
    .map(step => step.trim())  // премахва излишните интервали
    .filter(step => step);     // премахва празните стойности

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
      this.router.navigate(['/recipes']); // навигация към списъка с рецепти
    },
    error: (err) => {
      console.error('Error adding recipe:', err);
    }
  });
}

  showEdit(){
    this.onEditMode=true
  }

}
