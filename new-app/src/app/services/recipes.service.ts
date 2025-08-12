import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../types/Recipe';
import { HttpClient } from '@angular/common/http'; // или Firebase service, който имаш

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private baseUrl = 'your-api-or-firebase-url/recipes';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Record<string, Recipe>> {
    // При Firebase може да се ползва съответния метод на твоя Firebase service
    return this.http.get<Record<string, Recipe>>(this.baseUrl + '.json');
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/${id}.json`);
  }

  addRecipe(recipe: Recipe): Observable<any> {
    return this.http.post(this.baseUrl + '.json', recipe);
  }

  updateRecipe(id: string, recipe: Recipe): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}.json`, recipe);
  }

  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}.json`);
  }
}
