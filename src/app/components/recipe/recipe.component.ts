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
  favMeals = [];
  newmeals = []
  removeFrom = false;
  public safeUrl: SafeResourceUrl;
  showLoader = true;
  constructor(private route: ActivatedRoute, private service: RecipesService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // console.log(localStorage.getItem('mealId'))
    // this.favMeals = JSON.parse(localStorage.getItem('mealId'))
    console.log(this.favMeals)
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params)
        this.service.lookup(params.id).subscribe((res: any) => {
          if(res){
            // console.log(res.meals[0].idMeal)
            this.showLoader = false;
          this.singleRecipe = res.meals;
          this.mealID = res.meals[0].idMeal;
          let obj = this.singleRecipe[0]; 
          const youTubeLink = obj.strYoutube
          const cleanLink = youTubeLink.replace('watch?v=', 'embed/')
          console.log(cleanLink)
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
            this.noOfIngredients = Object.keys(this.newObj).length
            sessionStorage.setItem('ingredients', JSON.stringify(this.newObj))
          }
        })
      }
    )
  }
  lookup(params) {
    this.service.lookup(params.id).subscribe((res: any) => {
      console.log(res)
    })
  }

  addToFav() {
    // alert(this.singleRecipe.idMeal)
    // console.log(this.mealID)
    this.favMeals.push(this.mealID)
    const newarray = new Set(this.favMeals)
    console.log(newarray)
    localStorage.setItem('mealId', JSON.stringify(this.favMeals))
    // this.addTo = !this.addTo;
    // this.removeFrom = !this.removeFrom
  }
}
