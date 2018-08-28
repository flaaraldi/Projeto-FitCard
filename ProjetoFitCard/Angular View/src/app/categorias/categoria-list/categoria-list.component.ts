import { Component, OnInit, ViewChild } from '@angular/core';

import { CategoriaService } from '../shared/categoria.service';
import { Categoria } from '../shared/categoria.model';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {
  categorias: Categoria[];
  editCategoria: Categoria; 

  constructor(private categoriaService : CategoriaService) { }

  ngOnInit() {
    this.getCategorias();
  }
  
  getCategorias(): void {
    this.categoriaService.getList()
      .subscribe(categorias => {
        this.categorias = categorias;
      });
  }
  
  edit(categoria: Categoria) {
    this.editCategoria = categoria;
  }

  showForEdit(categoria: Categoria) {
    this.categoriaService.selectCategoria = Object.assign({}, categoria);
  }

  onDelete(categoria: Categoria): void {
    this.categorias = this.categorias.filter(h => h !== categoria);
    this.categoriaService.delete(categoria.seq).subscribe();
    this.getCategorias();
  }

}
