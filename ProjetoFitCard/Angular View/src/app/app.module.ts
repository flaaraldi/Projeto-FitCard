import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask'
import { BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { EstabelecimentosComponent } from './estabelecimentos/estabelecimentos.component';
import { EstabelecimentoComponent } from './estabelecimentos/estabelecimento/estabelecimento.component';
import { EstabelecimentoListComponent } from './estabelecimentos/estabelecimento-list/estabelecimento-list.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaComponent } from './categorias/categoria/categoria.component';
import { CategoriaListComponent } from './categorias/categoria-list/categoria-list.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    EstabelecimentosComponent,
    EstabelecimentoComponent,
    EstabelecimentoListComponent,
    CategoriasComponent,
    CategoriaComponent,
    CategoriaListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
