import { Component, OnInit } from '@angular/core';

import {CategoriaService} from './shared/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  providers:[CategoriaService]
})
export class CategoriasComponent implements OnInit {

  constructor(private categoriaService : CategoriaService) { }

  ngOnInit() {
  }

}
