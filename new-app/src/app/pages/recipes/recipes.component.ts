import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Recipe } from 'src/app/types/Recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];

  // Полета за формата
  newName: string = '';
  newProtein: number | null = null;

  // За редакция
  editId: string | null = null;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.loadRecipes();
  }

  // SoftUni 
  // loadRecipes(){
  //   this.firebaseService.getRecipes().subscribe((r) =>{
  //     console.log(r)
  //   })
  // }

  loadRecipes() {
    this.firebaseService.getRecipes().subscribe((res) => {
      if (res) {
        // res е Record<string, Recipe>
        this.recipes = Object.keys(res).map(key => ({
          id: key,           // добавяме id-то
          ...res[key]        // останалите данни на рецептата
        }));
      } else {
        this.recipes = [];
      }
      console.log('Loaded recipes:', this.recipes);
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
