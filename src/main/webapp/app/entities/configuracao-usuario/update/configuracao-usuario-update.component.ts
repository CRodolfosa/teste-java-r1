import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ConfiguracaoUsuarioFormService, ConfiguracaoUsuarioFormGroup } from './configuracao-usuario-form.service';
import { IConfiguracaoUsuario } from '../configuracao-usuario.model';
import { ConfiguracaoUsuarioService } from '../service/configuracao-usuario.service';
import { Status } from 'app/entities/enumerations/status.model';

@Component({
  selector: 'jhi-configuracao-usuario-update',
  templateUrl: './configuracao-usuario-update.component.html',
})
export class ConfiguracaoUsuarioUpdateComponent implements OnInit {
  isSaving = false;
  configuracaoUsuario: IConfiguracaoUsuario | null = null;
  statusValues = Object.keys(Status);

  editForm: ConfiguracaoUsuarioFormGroup = this.configuracaoUsuarioFormService.createConfiguracaoUsuarioFormGroup();

  constructor(
    protected configuracaoUsuarioService: ConfiguracaoUsuarioService,
    protected configuracaoUsuarioFormService: ConfiguracaoUsuarioFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ configuracaoUsuario }) => {
      this.configuracaoUsuario = configuracaoUsuario;
      if (configuracaoUsuario) {
        this.updateForm(configuracaoUsuario);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const configuracaoUsuario = this.configuracaoUsuarioFormService.getConfiguracaoUsuario(this.editForm);
    if (configuracaoUsuario.id !== null) {
      this.subscribeToSaveResponse(this.configuracaoUsuarioService.update(configuracaoUsuario));
    } else {
      this.subscribeToSaveResponse(this.configuracaoUsuarioService.create(configuracaoUsuario));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConfiguracaoUsuario>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(configuracaoUsuario: IConfiguracaoUsuario): void {
    this.configuracaoUsuario = configuracaoUsuario;
    this.configuracaoUsuarioFormService.resetForm(this.editForm, configuracaoUsuario);
  }
}
