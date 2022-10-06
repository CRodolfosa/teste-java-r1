import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../configuracao-usuario.test-samples';

import { ConfiguracaoUsuarioFormService } from './configuracao-usuario-form.service';

describe('ConfiguracaoUsuario Form Service', () => {
  let service: ConfiguracaoUsuarioFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguracaoUsuarioFormService);
  });

  describe('Service methods', () => {
    describe('createConfiguracaoUsuarioFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createConfiguracaoUsuarioFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cpf: expect.any(Object),
            status: expect.any(Object),
          })
        );
      });

      it('passing IConfiguracaoUsuario should create a new form with FormGroup', () => {
        const formGroup = service.createConfiguracaoUsuarioFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cpf: expect.any(Object),
            status: expect.any(Object),
          })
        );
      });
    });

    describe('getConfiguracaoUsuario', () => {
      it('should return NewConfiguracaoUsuario for default ConfiguracaoUsuario initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createConfiguracaoUsuarioFormGroup(sampleWithNewData);

        const configuracaoUsuario = service.getConfiguracaoUsuario(formGroup) as any;

        expect(configuracaoUsuario).toMatchObject(sampleWithNewData);
      });

      it('should return NewConfiguracaoUsuario for empty ConfiguracaoUsuario initial value', () => {
        const formGroup = service.createConfiguracaoUsuarioFormGroup();

        const configuracaoUsuario = service.getConfiguracaoUsuario(formGroup) as any;

        expect(configuracaoUsuario).toMatchObject({});
      });

      it('should return IConfiguracaoUsuario', () => {
        const formGroup = service.createConfiguracaoUsuarioFormGroup(sampleWithRequiredData);

        const configuracaoUsuario = service.getConfiguracaoUsuario(formGroup) as any;

        expect(configuracaoUsuario).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IConfiguracaoUsuario should not enable id FormControl', () => {
        const formGroup = service.createConfiguracaoUsuarioFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewConfiguracaoUsuario should disable id FormControl', () => {
        const formGroup = service.createConfiguracaoUsuarioFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
