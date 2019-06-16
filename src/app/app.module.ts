import { MatSidenavModule, MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routeComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipesService } from './services/recipes.service';
import { RandomrecipeComponent } from './components/randomrecipe/randomrecipe.component';
import { SearchComponent } from './components/search/search.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CategoryComponent } from './components/category/category.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    routeComponents,
    RandomrecipeComponent,
    SearchComponent,
    RecipeComponent,
    FavoritesComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule

  ],
  providers: [RecipesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
