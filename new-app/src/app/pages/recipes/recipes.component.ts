import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ErrorService } from 'src/app/shared/error-notification/error.service';
import { Recipe } from 'src/app/types/Recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  isLoading:boolean = true;

  constructor(
    private firebaseService: FirebaseService,
    private errorService:ErrorService
  ) { }

  ngOnInit() {
    this.loadRecipes();

    setTimeout(() => {
      this.isLoading=false;
    }, 500);
  }

 loadRecipes() {
    this.firebaseService.getRecipes().subscribe({
      next: (res) => {
        if (res) {
          this.recipes = Object.keys(res).map(key => ({
            id: key,          
            ...res[key]        
          }));
        } else {
          this.recipes = [];
        }
      },
      error: (err) => {
        console.error('Error loading recipes:', err);
        this.errorService.showError('Failed to load recipes. Please try again later.');
      }
    });
  }

}