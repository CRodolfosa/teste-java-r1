import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'configuracao-usuario',
        data: { pageTitle: 'convergenciaApp.configuracaoUsuario.home.title' },
        loadChildren: () => import('./configuracao-usuario/configuracao-usuario.module').then(m => m.ConfiguracaoUsuarioModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
