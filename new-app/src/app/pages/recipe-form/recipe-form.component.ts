import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
  constructor(private firebaseService: FirebaseService){}

  addTheme(form:NgForm){
    if(form.invalid){
      return;
    }

    console.log(form.value)
  }
}
