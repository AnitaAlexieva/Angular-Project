import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Recipe } from 'src/app/types/Recipe';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // взимаме id-то от URL-а
    if (id) {
      this.firebaseService.getRecipeById(id).subscribe((data) => {
        if (data) {
          this.recipe = { id, ...data }; // добавяме и id
        }
      });
    }
  }
}