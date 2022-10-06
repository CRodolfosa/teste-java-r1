import { Status } from 'app/entities/enumerations/status.model';

import { IConfiguracaoUsuario, NewConfiguracaoUsuario } from './configuracao-usuario.model';

export const sampleWithRequiredData: IConfiguracaoUsuario = {
  id: 21930,
  cpf: 'Marginal',
};

export const sampleWithPartialData: IConfiguracaoUsuario = {
  id: 55094,
  cpf: 'protocol',
  status: Status['CLOSED'],
};

export const sampleWithFullData: IConfiguracaoUsuario = {
  id: 67285,
  cpf: 'content-based District',
  status: Status['CLOSED'],
};

export const sampleWithNewData: NewConfiguracaoUsuario = {
  cpf: 'Sergipe application',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
