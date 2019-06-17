import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipeCategory = [];
  fixedInViewport = true;
  fixedTopGap = 0;
  fixedBottomGap = 0;
  constructor(private service:RecipesService, private router:Router) { }

  ngOnInit() {
    this.getCategories()
  }

  getCategories(){
    this.service.getAllCategories().subscribe((res:any)=>{
      this.recipeCategory = res.categories;
    })
  }
}
