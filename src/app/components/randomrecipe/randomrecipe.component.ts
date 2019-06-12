import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-randomrecipe',
  templateUrl: './randomrecipe.component.html',
  styleUrls: ['./randomrecipe.component.scss']
})
export class RandomrecipeComponent implements OnInit {
  newRandomRecipe = [];
  ingArray: any[] = []
  msmArray = [];
  various = [];
  ingredients: { [key: string]: string } = {}
  newObj: { [key: string]: string } = {};
  noOfIngredients;
  i;
  getIngredients: any;
  public safeURL: SafeResourceUrl;
  showLoader = true;
  public radLink: string;
  addTo = true;
  removeFrom = false;
  constructor(private service: RecipesService, private router: Router, private sanitizer: DomSanitizer) { }//these are all injected dependencies

  ngOnInit() {
    this.newRandomRecipe = JSON.parse(sessionStorage.getItem('data')) //getting the stored api data array from storage
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(sessionStorage.getItem('youtube')) //getting the sanitized URL
    this.noOfIngredients = sessionStorage.getItem('noOfIngre')
    this.newObj = JSON.parse(sessionStorage.getItem('ingredients'))// getting the ingredients object from storage
    if(this.newRandomRecipe.length > 0){
      this.showLoader = false;
    }
  }

  getRandomRecipe() {
    this.showLoader = true;
    this.ingArray.length = 0;
    this.msmArray.length = 0;
    this.service.getRandomRecipe().subscribe((res: any) => {
      if(res){
        console.log(res)
        this.showLoader = false;
        this.newRandomRecipe = res.meals; //set data from the api call into an empty array
      sessionStorage.setItem('data', JSON.stringify(res.meals)) //storing that data in sessionstorage
      this.radLink = res.meals[0].strYoutube; // used to get the youtube link so it can be sanitized and used
      const str = this.radLink.replace('watch?v=', 'embed/'); //replacing watch with embed so as to properly embed the youtube video or else error
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(str) //sanitizing the youtube URl
      sessionStorage.setItem('youtube', str) //storing that URL in the session storage
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
      }
      let o = {}
      for (this.i = 0; this.i < this.ingArray.length; this.i++) {
        o[this.ingArray[this.i]] = this.msmArray[this.i]
        this.newObj = o;
        this.noOfIngredients = Object.keys(this.newObj).length
        sessionStorage.setItem('noOfIngre', this.noOfIngredients)
        sessionStorage.setItem('ingredients', JSON.stringify(this.newObj))
      }
    })
  }

  addToFav() {
    // alert('clicked')
    this.addTo = !this.addTo;
    this.removeFrom = !this.removeFrom
  }
}
