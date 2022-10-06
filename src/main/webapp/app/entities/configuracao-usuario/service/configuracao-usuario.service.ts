import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConfiguracaoUsuario, NewConfiguracaoUsuario } from '../configuracao-usuario.model';

export type PartialUpdateConfiguracaoUsuario = Partial<IConfiguracaoUsuario> & Pick<IConfiguracaoUsuario, 'id'>;

export type EntityResponseType = HttpResponse<IConfiguracaoUsuario>;
export type EntityArrayResponseType = HttpResponse<IConfiguracaoUsuario[]>;

@Injectable({ providedIn: 'root' })
export class ConfiguracaoUsuarioService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/configuracao-usuarios');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(configuracaoUsuario: NewConfiguracaoUsuario): Observable<EntityResponseType> {
    return this.http.post<IConfiguracaoUsuario>(this.resourceUrl, configuracaoUsuario, { observe: 'response' });
  }

  update(configuracaoUsuario: IConfiguracaoUsuario): Observable<EntityResponseType> {
    return this.http.put<IConfiguracaoUsuario>(
      `${this.resourceUrl}/${this.getConfiguracaoUsuarioIdentifier(configuracaoUsuario)}`,
      configuracaoUsuario,
      { observe: 'response' }
    );
  }

  partialUpdate(configuracaoUsuario: PartialUpdateConfiguracaoUsuario): Observable<EntityResponseType> {
    return this.http.patch<IConfiguracaoUsuario>(
      `${this.resourceUrl}/${this.getConfiguracaoUsuarioIdentifier(configuracaoUsuario)}`,
      configuracaoUsuario,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConfiguracaoUsuario>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConfiguracaoUsuario[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getConfiguracaoUsuarioIdentifier(configuracaoUsuario: Pick<IConfiguracaoUsuario, 'id'>): number {
    return configuracaoUsuario.id;
  }

  compareConfiguracaoUsuario(o1: Pick<IConfiguracaoUsuario, 'id'> | null, o2: Pick<IConfiguracaoUsuario, 'id'> | null): boolean {
    return o1 && o2 ? this.getConfiguracaoUsuarioIdentifier(o1) === this.getConfiguracaoUsuarioIdentifier(o2) : o1 === o2;
  }

  addConfiguracaoUsuarioToCollectionIfMissing<Type extends Pick<IConfiguracaoUsuario, 'id'>>(
    configuracaoUsuarioCollection: Type[],
    ...configuracaoUsuariosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const configuracaoUsuarios: Type[] = configuracaoUsuariosToCheck.filter(isPresent);
    if (configuracaoUsuarios.length > 0) {
      const configuracaoUsuarioCollectionIdentifiers = configuracaoUsuarioCollection.map(
        configuracaoUsuarioItem => this.getConfiguracaoUsuarioIdentifier(configuracaoUsuarioItem)!
      );
      const configuracaoUsuariosToAdd = configuracaoUsuarios.filter(configuracaoUsuarioItem => {
        const configuracaoUsuarioIdentifier = this.getConfiguracaoUsuarioIdentifier(configuracaoUsuarioItem);
        if (configuracaoUsuarioCollectionIdentifiers.includes(configuracaoUsuarioIdentifier)) {
          return false;
        }
        configuracaoUsuarioCollectionIdentifiers.push(configuracaoUsuarioIdentifier);
        return true;
      });
      return [...configuracaoUsuariosToAdd, ...configuracaoUsuarioCollection];
    }
    return configuracaoUsuarioCollection;
  }
}
