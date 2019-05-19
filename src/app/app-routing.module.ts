import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RandomrecipeComponent } from './components/randomrecipe/randomrecipe.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'random', component: RandomrecipeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routeComponents = [HomeComponent, RandomrecipeComponent]
