import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { NavController } from '@ionic/angular';
import { DocumentsFacadeMock } from '@testing/mocks/facade/documents.facade.mock';
import { TestingModule } from '@testing/testing.module';
import { DocumentsFacade } from './documents.facade';
import { DocumentsPage } from './documents.page';
import { TypeAccount } from '@app/commons/entities/product/type-account';
import { DOCUMENT_LIST } from './constants/document.constants';

describe('DocumentsPage', () => {
  let component: DocumentsPage;
  let fixture: ComponentFixture<DocumentsPage>;
  let navControlSpy;

  beforeEach(waitForAsync(() => {
    navControlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    TestBed.configureTestingModule({
      declarations: [DocumentsPage, ImageUrlPipe],
      imports: [TestingModule],
      providers: [
        { provide: DocumentsFacade, useClass: DocumentsFacadeMock },
        { provide: NavController, useValue: navControlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call life cicles', () => {
    expect(component.ionViewWillEnter()).toBeUndefined();
    expect(component.ionViewDidLeave()).toBeUndefined();
  });

  it('should be navigateTo', () => {
    expect(
      component.navigateTo({
        label: '',
        image: '',
        url: ['']
      })
    ).toBeUndefined();
    expect(component.ionViewDidLeave()).toBeUndefined();
  });
  it('should filter document list when product type is CDA', () => {
    const mockCDAProduct = {
      type: TypeAccount.CDA
    };
    const facade = TestBed.inject(DocumentsFacade);
    spyOn(facade.productSelected$, 'currentValue').and.returnValue(
      mockCDAProduct
    );

    component.ionViewWillEnter();
    expect(component.documentList).toEqual(
      DOCUMENT_LIST.slice(1, DOCUMENT_LIST.length)
    );
  });
});
