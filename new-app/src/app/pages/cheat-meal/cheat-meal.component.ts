import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meal, MealDBResponse } from 'src/app/types/CheatMeal';
import { ErrorService } from 'src/app/shared/error-notification/error.service';


@Component({
  selector: 'app-cheat-meal',
  templateUrl: './cheat-meal.component.html',
  styleUrls: ['./cheat-meal.component.css']
})
export class CheatMealComponent implements OnInit {
  meals: Meal[] = [];
  loading = false;
  category: string = 'Chicken'; // първоначално зареждане за Chicken

  constructor(
    private http: HttpClient,
    private errorService:ErrorService
  ) {}

  ngOnInit(): void {
    this.takeByCategory(); // при зареждане показваме всички рецепти за Chicken
  }

  takeRandomMeal() {
    this.loading = true;
    this.http.get<MealDBResponse>('https://www.themealdb.com/api/json/v1/1/random.php')
      .subscribe({
        next: response => {
          this.meals = response.meals || [];
          this.loading = false;
        },
        error: () => {
          console.error('Error fetching random meal');
          this.errorService.showError('Error fetching random meal')
          this.loading = false;
        }
      });
  }

  takeByCategory() {
    if (!this.category.trim()) return;
    this.loading = true;
    this.http.get<MealDBResponse>(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.category}`)
      .subscribe({
        next: response => {
          this.meals = response.meals || [];
          this.loading = false;
        },
        error: () => {
          console.error('Error fetching meals by category');
          this.errorService.showError('Error fetching meals by category')
          this.loading = false;
        }
      });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.takeByCategory();
  }
}