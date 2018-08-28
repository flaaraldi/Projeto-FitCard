import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import {EstabelecimentoService} from '../shared/estabelecimento.service';
import { Estabelecimento } from '../shared/estabelecimento.model';


@Component({
  selector: 'app-estabelecimento-list',
  templateUrl: './estabelecimento-list.component.html',
  styleUrls: ['./estabelecimento-list.component.css']
})
export class EstabelecimentoListComponent implements OnInit {
  estabelecimentos: Estabelecimento[];
  editEstabelecimento: Estabelecimento; 
  returnedArray: Estabelecimento[];

  constructor(private estabelecimentoService : EstabelecimentoService) { }

  ngOnInit() {
    this.getEstabelecimentos();
    this.returnedArray = this.estabelecimentos.slice(0, 5);
  }
  
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.estabelecimentos.slice(startItem, endItem);
  }

  getEstabelecimentos(): void {
    this.estabelecimentoService.getEstabelecimentoList()
      .subscribe(estabelecimentos => this.estabelecimentos = estabelecimentos);
  }
  
  edit(estabelecimento: Estabelecimento) {
    this.editEstabelecimento = estabelecimento;
  }

  showForEdit(estabelecimento: Estabelecimento) {
    this.estabelecimentoService.selectEstabelecimento = Object.assign({}, estabelecimento);
  }

  onDelete(estabelecimento: Estabelecimento): void {
    this.estabelecimentos = this.estabelecimentos.filter(h => h !== estabelecimento);
    this.estabelecimentoService.deleteEstabelecimento(estabelecimento.seq).subscribe(_ => this.getEstabelecimentos());
    //;
  }

}
