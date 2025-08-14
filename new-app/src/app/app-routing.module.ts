import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './pages/recipe-form/recipe-form.component';
import { AboutComponent } from './pages/about/about.component';

import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ProfileComponent } from './user/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/add', component: RecipeFormComponent, canActivate:[AuthGuard] },
  { path: 'recipes/:id', component: RecipeDetailComponent},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent, canActivate:[GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate:[GuestGuard] },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  { path: 'profile/edit', component: EditProfileComponent, canActivate:[AuthGuard] },
  { path: '**', component: ErrorPageComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
