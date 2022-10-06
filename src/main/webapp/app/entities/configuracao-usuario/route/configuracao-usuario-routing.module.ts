import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ConfiguracaoUsuarioComponent } from '../list/configuracao-usuario.component';
import { ConfiguracaoUsuarioDetailComponent } from '../detail/configuracao-usuario-detail.component';
import { ConfiguracaoUsuarioUpdateComponent } from '../update/configuracao-usuario-update.component';
import { ConfiguracaoUsuarioRoutingResolveService } from './configuracao-usuario-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const configuracaoUsuarioRoute: Routes = [
  {
    path: '',
    component: ConfiguracaoUsuarioComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConfiguracaoUsuarioDetailComponent,
    resolve: {
      configuracaoUsuario: ConfiguracaoUsuarioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConfiguracaoUsuarioUpdateComponent,
    resolve: {
      configuracaoUsuario: ConfiguracaoUsuarioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConfiguracaoUsuarioUpdateComponent,
    resolve: {
      configuracaoUsuario: ConfiguracaoUsuarioRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(configuracaoUsuarioRoute)],
  exports: [RouterModule],
})
export class ConfiguracaoUsuarioRoutingModule {}
