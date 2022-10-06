import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ConfiguracaoUsuarioService } from '../service/configuracao-usuario.service';

import { ConfiguracaoUsuarioComponent } from './configuracao-usuario.component';

describe('ConfiguracaoUsuario Management Component', () => {
  let comp: ConfiguracaoUsuarioComponent;
  let fixture: ComponentFixture<ConfiguracaoUsuarioComponent>;
  let service: ConfiguracaoUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'configuracao-usuario', component: ConfiguracaoUsuarioComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [ConfiguracaoUsuarioComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(ConfiguracaoUsuarioComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConfiguracaoUsuarioComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ConfiguracaoUsuarioService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.configuracaoUsuarios?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to configuracaoUsuarioService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getConfiguracaoUsuarioIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getConfiguracaoUsuarioIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
