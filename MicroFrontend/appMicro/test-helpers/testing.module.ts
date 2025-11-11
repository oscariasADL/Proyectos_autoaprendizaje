import { registerLocaleData } from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';
import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TestComponent } from '@testing/component/test.component';
import '../src/app/commons/helpers/extend-types.helpers';

registerLocaleData(localeEsCO);

@NgModule({
  declarations: [TestComponent],
  imports: [RouterTestingModule, TranslateModule.forRoot()],
  exports: [TranslateModule]
})
export class TestingModule {}
