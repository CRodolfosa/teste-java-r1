import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IConfiguracaoUsuario } from '../configuracao-usuario.model';
import { ConfiguracaoUsuarioService } from '../service/configuracao-usuario.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './configuracao-usuario-delete-dialog.component.html',
})
export class ConfiguracaoUsuarioDeleteDialogComponent {
  configuracaoUsuario?: IConfiguracaoUsuario;

  constructor(protected configuracaoUsuarioService: ConfiguracaoUsuarioService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.configuracaoUsuarioService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
