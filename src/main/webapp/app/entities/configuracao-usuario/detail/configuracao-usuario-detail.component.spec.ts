import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConfiguracaoUsuarioDetailComponent } from './configuracao-usuario-detail.component';

describe('ConfiguracaoUsuario Management Detail Component', () => {
  let comp: ConfiguracaoUsuarioDetailComponent;
  let fixture: ComponentFixture<ConfiguracaoUsuarioDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguracaoUsuarioDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ configuracaoUsuario: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ConfiguracaoUsuarioDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ConfiguracaoUsuarioDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load configuracaoUsuario on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.configuracaoUsuario).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
