import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConfiguracaoUsuario } from '../configuracao-usuario.model';

@Component({
  selector: 'jhi-configuracao-usuario-detail',
  templateUrl: './configuracao-usuario-detail.component.html',
})
export class ConfiguracaoUsuarioDetailComponent implements OnInit {
  configuracaoUsuario: IConfiguracaoUsuario | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ configuracaoUsuario }) => {
      this.configuracaoUsuario = configuracaoUsuario;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
