import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../types/Recipe';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private baseUrl = 'https://project-angular-48822-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  // Взимане на всички рецепти
  getRecipes(): Observable<Record<string, Recipe>> {
    return this.http.get<Record<string, Recipe>>(`${this.baseUrl}/recipes.json`);
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/recipes/${id}.json`);
  }

  // Редактиране на рецепта
  updateRecipe(id: string, recipe: Recipe): Observable<any> {
    return this.http.put(`${this.baseUrl}/recipes/${id}.json`, recipe);
  }

  addRecipe(recipe: Recipe): Observable<{ name: string }> {
  // Firebase ще върне обект с генерирания ID като { name: string }
  return this.http.post<{ name: string }>(`${this.baseUrl}/recipes.json`, recipe);
}

  // // Добавяне на рецепта
  // addRecipe(recipe: Recipe): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/recipes.json`, recipe);
  // }

  // // Редактиране на рецепта
  // updateRecipe(id: string, recipe: Recipe): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/recipes/${id}.json`, recipe);
  // }

  // // Изтриване на рецепта
  // deleteRecipe(id: string): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/recipes/${id}.json`);
  // }
}