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
  i;
  j;
  ingArray: any[] = [];
  msmArray: any[] = []
  measurementsArr = []
  nothingFound = false;
  itemsFound = false;
  newObj: { [key: string]: string } = {}
  searchedData: any[] = [];
  searchresults: number;
  showLoader = true;
  constructor(private route: ActivatedRoute, private service: RecipesService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.s = params.s;
    })
    this.searchDB();
  }
  searchDB(){
    this.service.searchRecipeDB(this.s).subscribe((res:any)=>{
      if(res.meals === null){
        this.nothingFound = true;
        this.showLoader = false;
      }else{
        this.showLoader =  false;
        this.searchedData = res.meals
        this.itemsFound = true;
        this.searchresults=this.searchedData.length;
        let resultsarray = this.searchedData
        for(let y of resultsarray){
          let ingrSub: Array<any> = new Array();
          let msmSub: Array<any> = new Array();
           for(let obj in y){ 
             if(obj.includes('strIngredient')){ 
               if(y[obj]!=null){ 
                 if(y[obj].length > 0){ 
                   ingrSub.push(y[obj])
                 }
               }
             }
             else if(obj.includes('strMeasure')){ 
              if(y[obj]!=null){ 
                if(y[obj].length > 0){ 
                  msmSub.push(y[obj])
                }
              }
            }
           }
         if(ingrSub.length > 0 && msmSub.length > 0){
          this.ingArray.push(ingrSub)
          this.msmArray.push(msmSub)
         }    
         else
            ingrSub = null;//just to be sure that we do not leak the memory if engine thinks the oposite in some case
     
         }
      }
    })
    
    
  }

  
}
