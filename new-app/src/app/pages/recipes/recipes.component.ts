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

}