import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';
import { Recipe } from 'src/app/types/Recipe';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  userId = this.userService.user?.uid
  ownerId = this.recipe?.ownerId
  isLoggedIn = this.userService.isLogged

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private firebaseService: FirebaseService,
    private userService: UserService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) {
      this.firebaseService.getRecipeById(id).subscribe((data) => {
        if (data) {
          this.recipe = { id, ...data };
          this.ownerId = this.recipe.ownerId;  
        }
      });
    }
  }

  onEdit() {
  if (this.recipe?.id) {
    this.router.navigate([`/recipes/edit/${this.recipe.id}`]);
  }
  }


 onDelete(): void {
  if (!this.recipe?.id) {
    console.error("Recipe ID is missing!");
    return;
  }

  const confirmed = window.confirm("Are you sure you want to delete this recipe?");
  if (!confirmed) {
    return; 
  }

  this.firebaseService.deleteRecipe(this.recipe.id).subscribe({
    next: () => {
      console.log("Recipe deleted successfully");
      this.router.navigate(['/recipes']); 
    },
    error: (err) => {
      console.error("Error deleting recipe:", err);
    }
  });
}


}