import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';
import { Recipe } from 'src/app/types/Recipe';
import { RecipeComment } from 'src/app/types/Comment';

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
  newComment: string = '';

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

addComment() {
  if (!this.newComment.trim() || !this.recipe || !this.userId) return;

  const comment: RecipeComment = {
    userId: this.userId,
    username: this.userService.user?.username || 'Anonymous',
    text: this.newComment,
    imageUrl:this.userService.user?.imageUrl || 'https://cdn3.vectorstock.com/i/1000x1000/54/17/person-gray-photo-placeholder-man-vector-24005417.jpg',
    createdAt: Date.now()
  };

  if (!this.recipe.comments) this.recipe.comments = [];
this.recipe.comments.push(comment);

 if (this.recipe) {
  this.firebaseService.updateRecipe(this.recipe.id!, this.recipe).subscribe(() => {
    this.newComment = '';
  });
}
}

}