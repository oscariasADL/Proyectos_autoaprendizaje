import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalPipesModule } from '@app/commons/pipes/global-pipes.module';
import { ProductCantLoadProductComponent } from './product-cant-load-product.component';
import { HOME } from '@app/commons/constants/navigate.constants';
import { AppFacade } from '@app/app.facade';
import { StoreModule } from '@ngrx/store';

describe('ProductCantLoadProductComponent', () => {
  let component: ProductCantLoadProductComponent;
  let fixture: ComponentFixture<ProductCantLoadProductComponent>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  beforeEach(async () => {
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);

    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        GlobalPipesModule,
        ProductCantLoadProductComponent,
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: NavController, useValue: navCtrlSpy },
        { provide: AppFacade }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCantLoadProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to HOME when goHome is called', () => {
    component.goHome();
    expect(navCtrlSpy.navigateForward).toHaveBeenCalledWith(HOME);
  });
});
