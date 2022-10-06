import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConfiguracaoUsuario } from '../configuracao-usuario.model';
import { ConfiguracaoUsuarioService } from '../service/configuracao-usuario.service';

@Injectable({ providedIn: 'root' })
export class ConfiguracaoUsuarioRoutingResolveService implements Resolve<IConfiguracaoUsuario | null> {
  constructor(protected service: ConfiguracaoUsuarioService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConfiguracaoUsuario | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((configuracaoUsuario: HttpResponse<IConfiguracaoUsuario>) => {
          if (configuracaoUsuario.body) {
            return of(configuracaoUsuario.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
