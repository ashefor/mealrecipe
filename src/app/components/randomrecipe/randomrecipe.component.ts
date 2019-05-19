import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-randomrecipe',
  templateUrl: './randomrecipe.component.html',
  styleUrls: ['./randomrecipe.component.scss']
})
export class RandomrecipeComponent implements OnInit {
  newRandomRecipe = [];
  ingArray = [];
  msmArray = [];
  various = [];
  ingredients: {[key: string]: string} = {}
  i;
  getIngredients: any;
  public safeURL: SafeResourceUrl;
  public radLink: string
  constructor(private service: RecipesService, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.newRandomRecipe = JSON.parse(sessionStorage.getItem('data'))
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(sessionStorage.getItem('youtube'))
    // this.ingredients = JSON.parse(sessionStorage.getItem('ingredient'))
    // console.log(this.ingredients)
    this.ingredients = JSON.parse(sessionStorage.getItem('ingredients'))
    console.log(this.ingredients)
  }

  getRandomRecipe(){
    this.service.getRandomRecipe().subscribe((res:any)=>{
      this.newRandomRecipe =  res.meals;
      sessionStorage.setItem('data', JSON.stringify(res.meals))
      this.radLink = res.meals[0].strYoutube;
      const str = this.radLink.replace('watch?v=', 'embed/');
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(str)
      sessionStorage.setItem('youtube', str)
      // console.log(str)
      // console.log(this.newRandomRecipe)
      let obj = this.newRandomRecipe[0];
      for(let ing in obj){
        if(ing.includes('strIngredient')){
          if(obj[ing].length > 0){
            this.ingArray.push(obj[ing])
            // console.log(this.ingArray)
          }
        }else if(ing.includes('strMeasure')){
            if(obj[ing].length>0){
              this.msmArray.push(obj[ing])
              // console.log(this.msmArray)
            }
        }
      }
      for(this.i = 0; this.i<this.ingArray.length; this.i++){
        this.ingredients[this.ingArray[this.i]] = this.msmArray[this.i]
        // console.log(this.ingredients)
        sessionStorage.setItem('ingredients', JSON.stringify(this.ingredients))
      }
    })
    }
  
}
