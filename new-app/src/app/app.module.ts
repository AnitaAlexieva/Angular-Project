import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { environment } from './environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './pages/recipe-form/recipe-form.component';
import { AboutComponent } from './pages/about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { UserModule } from './user/user.module';
import { RecipeEditFormComponent } from './pages/recipe-edit-form/recipe-edit-form.component';
import { CheatMealComponent } from './pages/cheat-meal/cheat-meal.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent, RecipesComponent, RecipeDetailComponent, RecipeFormComponent, AboutComponent, ErrorPageComponent, RecipeEditFormComponent, CheatMealComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
