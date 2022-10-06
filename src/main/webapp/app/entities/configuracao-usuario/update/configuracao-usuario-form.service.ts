import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IConfiguracaoUsuario, NewConfiguracaoUsuario } from '../configuracao-usuario.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IConfiguracaoUsuario for edit and NewConfiguracaoUsuarioFormGroupInput for create.
 */
type ConfiguracaoUsuarioFormGroupInput = IConfiguracaoUsuario | PartialWithRequiredKeyOf<NewConfiguracaoUsuario>;

type ConfiguracaoUsuarioFormDefaults = Pick<NewConfiguracaoUsuario, 'id'>;

type ConfiguracaoUsuarioFormGroupContent = {
  id: FormControl<IConfiguracaoUsuario['id'] | NewConfiguracaoUsuario['id']>;
  cpf: FormControl<IConfiguracaoUsuario['cpf']>;
  status: FormControl<IConfiguracaoUsuario['status']>;
};

export type ConfiguracaoUsuarioFormGroup = FormGroup<ConfiguracaoUsuarioFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ConfiguracaoUsuarioFormService {
  createConfiguracaoUsuarioFormGroup(configuracaoUsuario: ConfiguracaoUsuarioFormGroupInput = { id: null }): ConfiguracaoUsuarioFormGroup {
    const configuracaoUsuarioRawValue = {
      ...this.getFormDefaults(),
      ...configuracaoUsuario,
    };
    return new FormGroup<ConfiguracaoUsuarioFormGroupContent>({
      id: new FormControl(
        { value: configuracaoUsuarioRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cpf: new FormControl(configuracaoUsuarioRawValue.cpf, {
        validators: [Validators.required],
      }),
      status: new FormControl(configuracaoUsuarioRawValue.status),
    });
  }

  getConfiguracaoUsuario(form: ConfiguracaoUsuarioFormGroup): IConfiguracaoUsuario | NewConfiguracaoUsuario {
    return form.getRawValue() as IConfiguracaoUsuario | NewConfiguracaoUsuario;
  }

  resetForm(form: ConfiguracaoUsuarioFormGroup, configuracaoUsuario: ConfiguracaoUsuarioFormGroupInput): void {
    const configuracaoUsuarioRawValue = { ...this.getFormDefaults(), ...configuracaoUsuario };
    form.reset(
      {
        ...configuracaoUsuarioRawValue,
        id: { value: configuracaoUsuarioRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ConfiguracaoUsuarioFormDefaults {
    return {
      id: null,
    };
  }
}
