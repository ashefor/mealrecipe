import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  s: string;
  ingredients = {}
  i;
  ralty = [];
  ingA = {}
  msmB = {}
  result = {
    ingredients: this.ingA,
    measurements: this.msmB
  }
  ingredientsArr = [];
  arraysha = [];
  measurementsArr = []
  nothingFound = false;
  itemsFound = false;
  searchedData: any[] = [];
  searchresults: number;
  constructor(private route: ActivatedRoute, private service: RecipesService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.s = params.s;
      console.log(this.s)
    })
    this.searchDB()
  }
  searchDB(){
    let ing = {};
    let msm = {}
    let rese = {
      ingr: ing,
      meas: msm
    }
    this.service.searchRecipeDB(this.s).subscribe((res:any)=>{
      if(res.meals === null){
        this.nothingFound = true;
      }else{
        this.searchedData = res.meals
        console.log(this.searchedData)
        this.itemsFound = true;
        this.searchresults=this.searchedData.length;
        this.searchedData.map(obj =>{
          this.ingA[obj.idMeal] = []
          this.msmB[obj.idMeal] = []
          for(let pro in obj){
            // console.log(pro)
            if(pro.includes('strIngredient')){
              if(obj[pro] !== null){
                if(obj[pro].length>0){
                  this.ingA[obj.idMeal].push(obj[pro])
                  // console.log(rese)
                }
              }
            }else if(pro.includes('strMeasure')){
              if(obj[pro] !== null){
                if(obj[pro].length>0){
                  this.msmB[obj.idMeal].push(obj[pro])
                  this.arraysha = this.result.measurements[obj.idMeal]
                  
                }
              }
            }
            
          }
        })
      }
    })
    
    
  }

}
