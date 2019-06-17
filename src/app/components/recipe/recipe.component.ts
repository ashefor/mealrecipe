import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  singleRecipe = [];
  ingArray: any[] = []
  msmArray: any[] = [];
  newObj: { [key: string]: string } = {};
  noOfIngredients: number;
  addTo = true;
  mealID;
  public favMeals = [];
  newmeals = []
  removeFrom = false;
  public safeUrl: SafeResourceUrl;
  showLoader = true;
  fixedInViewport = true;
  fixedTopGap = 0;
  fixedBottomGap = 0;
  constructor(private route: ActivatedRoute, private service: RecipesService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const retrrievedData = localStorage.getItem('mealIds')
    this.favMeals = JSON.parse(retrrievedData)
    if(this.favMeals == null){
      this.favMeals = [];
      console.log(this.favMeals)
    }
    this.route.params.subscribe(
      (params: Params) => {
        this.service.lookup(params.id).subscribe((res: any) => {
          if(res){
            this.showLoader = false;
          this.singleRecipe = res.meals;
          this.mealID = res.meals[0].idMeal;
          if(this.favMeals.includes(this.mealID)){
            this.addTo = false
            this.removeFrom = true
          }
          let obj = this.singleRecipe[0]; 
          const youTubeLink = obj.strYoutube
          const cleanLink = youTubeLink.replace('watch?v=', 'embed/')
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cleanLink)
          for (let ing in obj) {
            if (ing.includes('strIngredient')) {
              if (obj[ing] !== null) {
                if (obj[ing].length > 0) {
                  this.ingArray.push(obj[ing])
                }
              }
            } else if (ing.includes('strMeasure')) { 
              if (obj[ing] !== null) {
                if (obj[ing].length > 0) {
                  this.msmArray.push(obj[ing])
                }
              }
            }
          }
          }
          let o = {}
          for (let i = 0; i < this.ingArray.length; i++) {
            o[this.ingArray[i]] = this.msmArray[i]
            this.newObj = o;
            this.noOfIngredients = Object.keys(this.newObj).length;
          }
        })
      }
    )
  }

  addToFav() {
    this.favMeals.push(this.mealID)
    const newarray = new Set(this.favMeals)
    const arr =  Array.from(newarray)
    localStorage.setItem('mealIds', JSON.stringify(arr))
    if(this.favMeals.includes(this.mealID)){
      this.addTo = false
      this.removeFrom = true
    }
    
  }
  removeFromFav(){
    const index = this.favMeals.indexOf(this.mealID)
    if(index > -1 ){
      this.favMeals.splice(index, 1)
      this.addTo = true
      this.removeFrom = false
    }
    localStorage.setItem('mealIds', JSON.stringify(this.favMeals))
  }
}
