import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipeCategory: [] = []
  constructor(private service:RecipesService, private router:Router) { }

  ngOnInit() {
    this.getCategories()
    this.allCat()
  }

  getCategories(){
    this.service.getAllCategories().subscribe((res:any)=>{
      this.recipeCategory = res.categories;
      console.log(this.recipeCategory)
    })
  }
  allCat(){
    this.service.listAllCategories().subscribe((res:any)=>{
      console.log(res)
    })
  }
}
