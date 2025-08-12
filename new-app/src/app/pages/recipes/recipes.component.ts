import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Recipe } from 'src/app/types/Recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{
recipes: Record<string, Recipe> = {};

  // Полета за формата
  newName: string = '';
  newProtein: number | null = null;

  // За редакция
  editId: string | null = null;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.loadRecipes();
  }

  loadRecipes() {
    this.firebaseService.getRecipes().subscribe((res) => {
      this.recipes = res || {};
    });
  }

  addRecipe() {
    if (!this.newName || this.newProtein === null) return;

    const recipe: Recipe = {
      name: this.newName,
      protein: this.newProtein
    };

    if (this.editId) {
      this.firebaseService.updateRecipe(this.editId, recipe).subscribe(() => {
        this.cancelEdit();
        this.loadRecipes();
      });
    } else {
      this.firebaseService.addRecipe(recipe).subscribe(() => {
        this.newName = '';
        this.newProtein = null;
        this.loadRecipes();
      });
    }
  }

  editRecipe(id: string, recipe: Recipe) {
    this.editId = id;
    this.newName = recipe.name;
    this.newProtein = recipe.protein;
  }

  cancelEdit() {
    this.editId = null;
    this.newName = '';
    this.newProtein = null;
  }

  deleteRecipe(id: string) {
    this.firebaseService.deleteRecipe(id).subscribe(() => {
      this.loadRecipes();
    });
  }
}
