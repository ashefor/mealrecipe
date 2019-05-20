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
  constructor(private route: ActivatedRoute, private service: RecipesService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.s = params.s;
      console.log(this.s)
    })
    this.service.searchRecipeDB(this.s).subscribe((res:any)=>{
      console.log(res)
    })
  }

}
