import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  public baseURL = 'https://www.themealdb.com/api/json/v1/1/'
  constructor(private http:HttpClient) { }

  getAllCategories(){
    return this.http.get(`${this.baseURL}categories.php`)
  }
  getRandomRecipe(){
    return this.http.get(`${this.baseURL}random.php`)
  }
  listAllCategories(){
    return this.http.get(`${this.baseURL}list.php?c=list`)
  }
  searchRecipeDB(searchItem){
    return this.http.get(`${this.baseURL}search.php?s=${searchItem}`)
  }
  lookup(params){
    return this.http.get(`${this.baseURL}lookup.php?i=${params}`)
  }
  filterbyCat(params){
    return this.http.get(`${this.baseURL}filter.php?c=${params}`)
  }
}
