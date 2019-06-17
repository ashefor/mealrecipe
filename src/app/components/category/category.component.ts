import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  foodCategoryResults = []
  category;
  showLoader = true;
  fixedInViewport = true;
  fixedTopGap = 0;
  fixedBottomGap = 0;
  constructor(private route: ActivatedRoute, private service: RecipesService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.category = params.category
      this.service.filterbyCat(params.category).subscribe((res:any)=>{
        if(res){
          this.showLoader = false;
          this.foodCategoryResults = res.meals;
        }
      })
    })
  }

}
