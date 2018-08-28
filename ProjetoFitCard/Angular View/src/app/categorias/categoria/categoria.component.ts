import { Component, OnInit } from '@angular/core';

import {CategoriaService} from '../shared/categoria.service';
import { Categoria } from '../shared/categoria.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[];
  editcategoria: Categoria; 

  constructor(private categoriaService : CategoriaService) { }

  ngOnInit() {
    this.resetForm();
    this.getCategoria();
  }

  getCategoria(): void{
    this.categoriaService.getList()
      .subscribe(categorias => this.categorias = categorias);
  }

  resetForm(form? : NgForm){
    if(form != null)
      form.reset();
    this.categoriaService.selectCategoria = {
      seq : null,
      descricao :''
    }
  }

  onSubmit(form : NgForm) {
    if (this.categoriaService.selectCategoria.seq == null) {
      this.categoriaService.add(form.value)
      .subscribe( data => {
        this.categorias.push(form.value);
      });
    } else {
      this.categoriaService.update(this.categoriaService.selectCategoria)
      .subscribe();
    }
    
    this.resetForm();
    this.categoriaService.getList();
  }

}
