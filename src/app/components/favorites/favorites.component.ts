import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favMeals = [];
  meals = [];
  allfavs = [];
  public safeURL: SafeResourceUrl;
  allcleanLinks = [];
  arr = [];
  ingArray: any[] = [];
  msmArray: any[] = []
  newObj: { [key: string]: string } = {};
  mealID;
  showmore = false;
  nothingFound = false;
  constructor(private service: RecipesService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const retrrievedData = localStorage.getItem('mealIds')
    this.favMeals = JSON.parse(retrrievedData)
    const newarray = new Set(this.favMeals)
    console.log(this.favMeals)
    const fav = Array.from(newarray)
    if(fav.length < 1){
      this.nothingFound = true;
    }
    for (let index of fav) {
      this.service.lookup(index).subscribe((res: any) => {
        this.meals.push(res.meals[0])
        // console.log(this.meals)
        let allObj = res.meals[0];
        const youTubeLink = allObj.strYoutube
        const cleanLink = youTubeLink.replace('watch?v=', 'embed/')
        this.allcleanLinks.push(cleanLink)
        for (let index in this.allcleanLinks) {
          this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.allcleanLinks[index])
        }
        this.arr.push(this.safeURL)
      })
    }

  }
  removeFromFav(e){
    console.log(this.favMeals.indexOf(this.mealID))
    const index = this.favMeals.indexOf(this.mealID)
    if(index > -1 ){
      // this.favMeals.splice(index, 1)

    alert(this.mealID)
      console.log(status)
      console.log(this.favMeals)
    }
    // localStorage.setItem('mealIds', JSON.stringify(this.favMeals))
  }
}

