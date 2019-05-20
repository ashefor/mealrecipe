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
  ingArray = [];
  msmArray = [];
  various = [];
  ingredients: {[key: string]: string} = {}
  newObj = {}
  i;
  getIngredients: any;
  public safeURL: SafeResourceUrl;
  public radLink: string
  constructor(private service: RecipesService, private router: Router, private sanitizer: DomSanitizer) {}//these are all injected dependencies

  ngOnInit() {
    //this part of the file is used to handle whatever requests or function whenever a page has successfully loaded or refresh.
    // it was my idea to store data in session storage so that on refresh of browser the user gets his/her last random recipe request
    //this data will remain until a new api request is made in which it replaces the previous one

    this.newRandomRecipe = JSON.parse(sessionStorage.getItem('data')) //getting the stored api data array from storage
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(sessionStorage.getItem('youtube')) //getting the sanitized URL
    this.newObj = JSON.parse(sessionStorage.getItem('ingredients'))// getting the ingredients object from storage
  }

  getRandomRecipe(){
    this.service.getRandomRecipe().subscribe((res:any)=>{
      this.newRandomRecipe =  res.meals; //set data from the api call into an empty array
      console.log(this.newRandomRecipe)
      sessionStorage.setItem('data', JSON.stringify(res.meals)) //storing that data in sessionstorage
      this.radLink = res.meals[0].strYoutube; // used to get the youtube link so it can be sanitized and used
      const str = this.radLink.replace('watch?v=', 'embed/'); //replacing watch with embed so as to properly embed the youtube video or else error
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(str) //sanitizing the youtube URl
      sessionStorage.setItem('youtube', str) //storing that URL in the session storage
      let obj = this.newRandomRecipe[0]; // yu=ou should recognise your own function from here
      for(let ing in obj){
        if(ing.includes('strIngredient')){
          if(obj[ing] !== null){
            if(obj[ing].length > 0){
              this.ingArray.push(obj[ing])
            }
          }
        }else if(ing.includes('strMeasure')){ //till here, I edited it and got the measurement array
            if(obj[ing] !== null){
              if(obj[ing].length>0){
                this.msmArray.push(obj[ing])
              }
            }
        }
      }
      // for(this.i = 0; this.i<this.ingArray.length; this.i++){
      //   this.ingredients[this.ingArray[this.i]] = this.msmArray[this.i] //converting both the ingredients array and measurement array into an object with ingredient array as the key and measurement array as the value. 
      //   sessionStorage.setItem('ingredients', JSON.stringify(this.ingredients)) //stoting that new object inside the sessionstorage
      // }
      var newarray = [];
      for (var y = 0; y < this.ingArray.length; y++) {
          var thing = {};
          for (var i = 0; i < this.msmArray.length; i++) {
              this.newObj[this.ingArray[i]] = this.msmArray[i];
          }
          newarray.push(this.newObj);
          sessionStorage.setItem('ingredients', JSON.stringify(this.newObj)) //stoting that new object inside the sessionstorage
          // console.log(this.newObj)
          // console.log(newarray[newarray.length-1])
      }
    })
    }
  
}
