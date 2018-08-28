import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { EstabelecimentosComponent }   from './estabelecimentos/estabelecimentos.component';
import { CategoriasComponent }      from './categorias/categorias.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/Estabelecimentos', pathMatch: 'full' },
  { path: 'Estabelecimentos', component: EstabelecimentosComponent },
  { path: 'Categorias', component: CategoriasComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
