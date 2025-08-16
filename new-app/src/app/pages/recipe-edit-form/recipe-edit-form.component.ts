import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';
import { Recipe } from 'src/app/types/Recipe';

@Component({
  selector: 'app-recipe-edit-form',
  templateUrl: './recipe-edit-form.component.html',
  styleUrls: ['./recipe-edit-form.component.css']
})
export class RecipeEditFormComponent implements OnInit {
  recipeId!: string;
  recipe: Recipe | null = null;
  stepsInput: string = '';
  user = this.userService.user?.uid;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id')!;
    this.firebaseService.getRecipeById(this.recipeId).subscribe(recipe => {
      if (recipe) {
        this.recipe = { id: this.recipeId, ...recipe };
        this.stepsInput = recipe.steps ? recipe.steps.join(', ') : '';
      }
    });
  }

  updateRecipe(form: NgForm): void {
    if (form.invalid || !this.user || !this.recipe) return;

    const stepsArray = this.stepsInput
      ? this.stepsInput.split(',').map(s => s.trim()).filter(s => s)
      : [];

    const updatedRecipe: Recipe = {
      title: form.value.title,
      protein: form.value.protein,
      calories: form.value.calories,
      prepTime: form.value.prepTime,
      description: form.value.description,
      steps: stepsArray,
      imageUrl: form.value.imageUrl,
      ownerId: this.user
    };

    this.firebaseService.updateRecipe(this.recipeId, updatedRecipe).subscribe({
      next: () => {
        console.log('Recipe updated successfully');
        this.router.navigate(['/recipes', this.recipeId]);
      },
      error: (err) => console.error('Error updating recipe:', err)
    });
  }
}
