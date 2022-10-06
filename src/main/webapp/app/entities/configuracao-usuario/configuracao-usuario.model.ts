import { Status } from 'app/entities/enumerations/status.model';

export interface IConfiguracaoUsuario {
  id: number;
  cpf?: string | null;
  status?: Status | null;
}

export type NewConfiguracaoUsuario = Omit<IConfiguracaoUsuario, 'id'> & { id: null };
