import { Component, OnInit } from '@angular/core';

import {EstabelecimentoService} from './shared/estabelecimento.service';

@Component({
  selector: 'app-estabelecimentos',
  templateUrl: './estabelecimentos.component.html',
  styleUrls: ['./estabelecimentos.component.css'],
  providers:[EstabelecimentoService]
})
export class EstabelecimentosComponent implements OnInit {

  constructor(private estabelecimentoService : EstabelecimentoService) { }

  ngOnInit() {
  }

}
