import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ConfiguracaoUsuarioFormService } from './configuracao-usuario-form.service';
import { ConfiguracaoUsuarioService } from '../service/configuracao-usuario.service';
import { IConfiguracaoUsuario } from '../configuracao-usuario.model';

import { ConfiguracaoUsuarioUpdateComponent } from './configuracao-usuario-update.component';

describe('ConfiguracaoUsuario Management Update Component', () => {
  let comp: ConfiguracaoUsuarioUpdateComponent;
  let fixture: ComponentFixture<ConfiguracaoUsuarioUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let configuracaoUsuarioFormService: ConfiguracaoUsuarioFormService;
  let configuracaoUsuarioService: ConfiguracaoUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ConfiguracaoUsuarioUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ConfiguracaoUsuarioUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConfiguracaoUsuarioUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    configuracaoUsuarioFormService = TestBed.inject(ConfiguracaoUsuarioFormService);
    configuracaoUsuarioService = TestBed.inject(ConfiguracaoUsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const configuracaoUsuario: IConfiguracaoUsuario = { id: 456 };

      activatedRoute.data = of({ configuracaoUsuario });
      comp.ngOnInit();

      expect(comp.configuracaoUsuario).toEqual(configuracaoUsuario);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConfiguracaoUsuario>>();
      const configuracaoUsuario = { id: 123 };
      jest.spyOn(configuracaoUsuarioFormService, 'getConfiguracaoUsuario').mockReturnValue(configuracaoUsuario);
      jest.spyOn(configuracaoUsuarioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ configuracaoUsuario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: configuracaoUsuario }));
      saveSubject.complete();

      // THEN
      expect(configuracaoUsuarioFormService.getConfiguracaoUsuario).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(configuracaoUsuarioService.update).toHaveBeenCalledWith(expect.objectContaining(configuracaoUsuario));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConfiguracaoUsuario>>();
      const configuracaoUsuario = { id: 123 };
      jest.spyOn(configuracaoUsuarioFormService, 'getConfiguracaoUsuario').mockReturnValue({ id: null });
      jest.spyOn(configuracaoUsuarioService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ configuracaoUsuario: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: configuracaoUsuario }));
      saveSubject.complete();

      // THEN
      expect(configuracaoUsuarioFormService.getConfiguracaoUsuario).toHaveBeenCalled();
      expect(configuracaoUsuarioService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IConfiguracaoUsuario>>();
      const configuracaoUsuario = { id: 123 };
      jest.spyOn(configuracaoUsuarioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ configuracaoUsuario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(configuracaoUsuarioService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
