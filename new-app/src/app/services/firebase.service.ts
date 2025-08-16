import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Recipe } from '../types/Recipe';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private baseUrl = 'https://project-angular-48822-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Record<string, Recipe>> {
    return this.http.get<Record<string, Recipe>>(`${this.baseUrl}/recipes.json`);
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/recipes/${id}.json`);
  }


  addRecipe(recipe: Recipe): Observable<{ name: string }> {
    // Firebase ще върне обект с генерирания ID като { name: string }
    return this.http.post<{ name: string }>(`${this.baseUrl}/recipes.json`, recipe);
  }
  updateRecipe(id: string, recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.baseUrl}/recipes/${id}.json`, recipe);
  }

  deleteRecipe(id: string): Observable<null> {
    return this.http.delete<null>(`${this.baseUrl}/recipes/${id}.json`);
  }
 getRecipesByUser(userId: string): Observable<Recipe[]> {
  return this.getRecipes().pipe(
    map((recipesObj: Record<string, Recipe>) => {
      const recipes: Recipe[] = [];

      for (const key in recipesObj) {
        if (recipesObj.hasOwnProperty(key)) {
          recipes.push({ id: key, ...recipesObj[key] });
        }
      }

      // филтрираме по ownerId
      return recipes.filter(r => r.ownerId === userId);
    })
  );
}
}


