import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IConfiguracaoUsuario } from '../configuracao-usuario.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../configuracao-usuario.test-samples';

import { ConfiguracaoUsuarioService } from './configuracao-usuario.service';

const requireRestSample: IConfiguracaoUsuario = {
  ...sampleWithRequiredData,
};

describe('ConfiguracaoUsuario Service', () => {
  let service: ConfiguracaoUsuarioService;
  let httpMock: HttpTestingController;
  let expectedResult: IConfiguracaoUsuario | IConfiguracaoUsuario[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ConfiguracaoUsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a ConfiguracaoUsuario', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const configuracaoUsuario = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(configuracaoUsuario).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ConfiguracaoUsuario', () => {
      const configuracaoUsuario = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(configuracaoUsuario).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ConfiguracaoUsuario', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ConfiguracaoUsuario', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ConfiguracaoUsuario', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addConfiguracaoUsuarioToCollectionIfMissing', () => {
      it('should add a ConfiguracaoUsuario to an empty array', () => {
        const configuracaoUsuario: IConfiguracaoUsuario = sampleWithRequiredData;
        expectedResult = service.addConfiguracaoUsuarioToCollectionIfMissing([], configuracaoUsuario);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(configuracaoUsuario);
      });

      it('should not add a ConfiguracaoUsuario to an array that contains it', () => {
        const configuracaoUsuario: IConfiguracaoUsuario = sampleWithRequiredData;
        const configuracaoUsuarioCollection: IConfiguracaoUsuario[] = [
          {
            ...configuracaoUsuario,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addConfiguracaoUsuarioToCollectionIfMissing(configuracaoUsuarioCollection, configuracaoUsuario);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ConfiguracaoUsuario to an array that doesn't contain it", () => {
        const configuracaoUsuario: IConfiguracaoUsuario = sampleWithRequiredData;
        const configuracaoUsuarioCollection: IConfiguracaoUsuario[] = [sampleWithPartialData];
        expectedResult = service.addConfiguracaoUsuarioToCollectionIfMissing(configuracaoUsuarioCollection, configuracaoUsuario);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(configuracaoUsuario);
      });

      it('should add only unique ConfiguracaoUsuario to an array', () => {
        const configuracaoUsuarioArray: IConfiguracaoUsuario[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const configuracaoUsuarioCollection: IConfiguracaoUsuario[] = [sampleWithRequiredData];
        expectedResult = service.addConfiguracaoUsuarioToCollectionIfMissing(configuracaoUsuarioCollection, ...configuracaoUsuarioArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const configuracaoUsuario: IConfiguracaoUsuario = sampleWithRequiredData;
        const configuracaoUsuario2: IConfiguracaoUsuario = sampleWithPartialData;
        expectedResult = service.addConfiguracaoUsuarioToCollectionIfMissing([], configuracaoUsuario, configuracaoUsuario2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(configuracaoUsuario);
        expect(expectedResult).toContain(configuracaoUsuario2);
      });

      it('should accept null and undefined values', () => {
        const configuracaoUsuario: IConfiguracaoUsuario = sampleWithRequiredData;
        expectedResult = service.addConfiguracaoUsuarioToCollectionIfMissing([], null, configuracaoUsuario, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(configuracaoUsuario);
      });

      it('should return initial array if no ConfiguracaoUsuario is added', () => {
        const configuracaoUsuarioCollection: IConfiguracaoUsuario[] = [sampleWithRequiredData];
        expectedResult = service.addConfiguracaoUsuarioToCollectionIfMissing(configuracaoUsuarioCollection, undefined, null);
        expect(expectedResult).toEqual(configuracaoUsuarioCollection);
      });
    });

    describe('compareConfiguracaoUsuario', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareConfiguracaoUsuario(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareConfiguracaoUsuario(entity1, entity2);
        const compareResult2 = service.compareConfiguracaoUsuario(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareConfiguracaoUsuario(entity1, entity2);
        const compareResult2 = service.compareConfiguracaoUsuario(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareConfiguracaoUsuario(entity1, entity2);
        const compareResult2 = service.compareConfiguracaoUsuario(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
