import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IConfiguracaoUsuario } from '../configuracao-usuario.model';
import { ConfiguracaoUsuarioService } from '../service/configuracao-usuario.service';

import { ConfiguracaoUsuarioRoutingResolveService } from './configuracao-usuario-routing-resolve.service';

describe('ConfiguracaoUsuario routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ConfiguracaoUsuarioRoutingResolveService;
  let service: ConfiguracaoUsuarioService;
  let resultConfiguracaoUsuario: IConfiguracaoUsuario | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(ConfiguracaoUsuarioRoutingResolveService);
    service = TestBed.inject(ConfiguracaoUsuarioService);
    resultConfiguracaoUsuario = undefined;
  });

  describe('resolve', () => {
    it('should return IConfiguracaoUsuario returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConfiguracaoUsuario = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultConfiguracaoUsuario).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConfiguracaoUsuario = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultConfiguracaoUsuario).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IConfiguracaoUsuario>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultConfiguracaoUsuario = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultConfiguracaoUsuario).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
