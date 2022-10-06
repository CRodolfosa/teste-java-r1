import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ConfiguracaoUsuarioComponent } from './list/configuracao-usuario.component';
import { ConfiguracaoUsuarioDetailComponent } from './detail/configuracao-usuario-detail.component';
import { ConfiguracaoUsuarioUpdateComponent } from './update/configuracao-usuario-update.component';
import { ConfiguracaoUsuarioDeleteDialogComponent } from './delete/configuracao-usuario-delete-dialog.component';
import { ConfiguracaoUsuarioRoutingModule } from './route/configuracao-usuario-routing.module';

@NgModule({
  imports: [SharedModule, ConfiguracaoUsuarioRoutingModule],
  declarations: [
    ConfiguracaoUsuarioComponent,
    ConfiguracaoUsuarioDetailComponent,
    ConfiguracaoUsuarioUpdateComponent,
    ConfiguracaoUsuarioDeleteDialogComponent,
  ],
})
export class ConfiguracaoUsuarioModule {}
