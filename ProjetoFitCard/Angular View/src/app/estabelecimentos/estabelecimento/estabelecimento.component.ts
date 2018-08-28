import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { setTheme } from 'ngx-bootstrap/utils';

import {EstabelecimentoService} from '../shared/estabelecimento.service';
import { Estabelecimento } from '../shared/estabelecimento.model';
import { Status } from '../shared/status.model';
import { Categoria } from '../shared/categoria.model';

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.component.html',
  styleUrls: ['./estabelecimento.component.css']
})
export class EstabelecimentoComponent implements OnInit {
  estabelecimentos: Estabelecimento[];
  editEstabelecimento: Estabelecimento; 
  categorias: Categoria[];
  status: Status[];
  
  constructor(private estabelecimentoService : EstabelecimentoService) { 
    setTheme('bs4'); // or 'bs4'
  }

  ngOnInit() {
    this.resetForm();
    this.getStatus();
    this.getCategoria();
  }

  isRequired(form : NgForm): Boolean {
    if(this.categorias == undefined || this.categorias == null)
      return false;
    let index = this.categorias.find(item => item.descricao === "Supermercado");
    
    return (index.seq == form.value.id_categoria);
  }

  getStatus(): void{
    this.estabelecimentoService.getStatusList()
      .subscribe(status => this.status = status);
  }
  
  getCategoria(): void{
    this.estabelecimentoService.getCategoriaList()
      .subscribe(categorias => this.categorias = categorias);
  }

  resetForm(form? : NgForm){
    if(form != null)
      form.reset();
    this.estabelecimentoService.selectEstabelecimento = {
      seq : null,
      razao_social :'',
      nome_fantasia :'',
      cnpj :'',
      email :'',
      endereco :'',
      cidade :'',
      estado :'',
      telefone :'',
      id_categoria  :null,
      id_status  :null,
      conta  :'',
      agencia  :'',
      data_inclusao:null
    }
  }

  onSubmit(form : NgForm) {
    if (this.estabelecimentoService.selectEstabelecimento.seq == null) {
      if(form.value.data_inclusao == null)
      {
        var data = new Date();
        var str = data.toLocaleDateString();
        form.value.data_inclusao = str.substring(6,10) + "/" + str.substring(3,5) + "/" + str.substring(0,2);
      }

      this.estabelecimentoService.add(form.value)
      .subscribe( data => {
        this.estabelecimentos.push(form.value);
      })
    } else {
      form.value.seq = this.estabelecimentoService.selectEstabelecimento.seq;
      console.log(form.value.data_inclusao);
      this.estabelecimentoService.updateEstabelecimento(form.value)
      .subscribe();
    }
    this.resetForm();
    this.estabelecimentoService.getEstabelecimentoList();
    
  }
}
