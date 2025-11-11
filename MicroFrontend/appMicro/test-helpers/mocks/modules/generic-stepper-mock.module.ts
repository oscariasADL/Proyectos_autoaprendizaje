import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyFormatPipe } from '@commons/pipes/currency-format.pipe';
import { ImageUrlPipe } from '@commons/pipes/image-url.pipe';
import { FeatureToggleService } from '@commons/services/feature-toggle.service';
import { IonicModule } from '@ionic/angular';
import { GenericStepperFacade } from '@modules/templates/generic-stepper/generic-stepper.facade';
import { GenericStepperFacadeMock } from '@testing/mocks/facade/generic-stepper.facade.mock';
import { FeatureToggleServiceMock } from '@testing/mocks/services/feature-toggle.service.mock';
import { TestingModule } from '@testing/testing.module';

@NgModule({
  imports: [
    IonicModule,
    HttpClientTestingModule,
    ReactiveFormsModule,
    TestingModule
  ],
  exports: [TestingModule],
  providers: [
    ImageUrlPipe,
    CurrencyFormatPipe,
    {
      provide: FeatureToggleService,
      useClass: FeatureToggleServiceMock
    },
    {
      provide: GenericStepperFacade,
      useClass: GenericStepperFacadeMock
    }
  ]
})
export class GenericStepperMockModule {}
