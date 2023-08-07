import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitsListComponent } from './components/produits-list/produits-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'produit', pathMatch: 'full' },
  { path: 'produit', component: ProduitsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }