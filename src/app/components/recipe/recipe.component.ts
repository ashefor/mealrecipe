import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  newRandomRecipe = [];
  ingArray: any[] = []
  msmArray: any[] = [];
  newObj: { [key: string]: string } = {}
  constructor(private route: ActivatedRoute, private service: RecipesService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params)=>{
        console.log(params)
        this.service.lookup(params.id).subscribe((res:any)=>{
          console.log(res)
          this.newRandomRecipe = res.meals;
          let obj = this.newRandomRecipe[0]; // you should recognise your own function from here
      for (let ing in obj) {
        if (ing.includes('strIngredient')) {
          if (obj[ing] !== null) {
            if (obj[ing].length > 0) {
              this.ingArray.push(obj[ing])

            }
          }
        } else if (ing.includes('strMeasure')) { //till here, I edited it and got the measurement array
          if (obj[ing] !== null) {
            if (obj[ing].length > 0) {
              this.msmArray.push(obj[ing])
            }
          }
        }
      }
      let o = {}
      for (let i = 0; i < this.ingArray.length; i++) {
        o[this.ingArray[i]] = this.msmArray[i]
        this.newObj = o;
        sessionStorage.setItem('ingredients', JSON.stringify(this.newObj))
      }
        })
      }
    )
  }
  lookup(params){
    this.service.lookup(params.id).subscribe((res:any)=>{
      console.log(res)
    })
  }
}
