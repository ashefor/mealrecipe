import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RandomrecipeComponent } from './components/randomrecipe/randomrecipe.component';
import { SearchComponent } from './components/search/search.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'random', component: RandomrecipeComponent},
  {path: 'recipe/:id', component: RecipeComponent},
  {path: 'category/:category', component: CategoryComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'search', component: SearchComponent, pathMatch: 'prefix'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routeComponents = [HomeComponent, 
  RandomrecipeComponent, 
  SearchComponent, 
  RecipeComponent, 
  FavoritesComponent,
  CategoryComponent
]
