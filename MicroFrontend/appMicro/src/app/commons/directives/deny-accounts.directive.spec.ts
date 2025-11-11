import { Component } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick
} from '@angular/core/testing';
import { DenyAccountsDirective } from './deny-accounts.directive';
import { AppFacade } from '@app/app.facade';
import { Subject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { AppFacadeMock } from '@testing/mocks/facade/app.facade.mock';

@Component({
  template: `
    <ng-container *appDenyAccounts="['CC']">
      <p class="test-content">Contenido visible</p>
    </ng-container>
  `
})
class TestComponent {}

describe('DenyAccountsDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let userDataSubject: Subject<any>;
  let facade: AppFacadeMock;

  beforeEach(() => {
    userDataSubject = new Subject();

    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [{ provide: AppFacade, useClass: AppFacadeMock }],
      imports: [DenyAccountsDirective]
    });

    fixture = TestBed.createComponent(TestComponent);
    facade = TestBed.inject(AppFacade) as any;
    facade.userData$ = userDataSubject;
  });

  it('debería ocultar el contenido si el tipo de documento está en la lista', () => {
    userDataSubject.next({
      dataBasicClientDto: { documentType: 'CC' }
    });

    fixture.detectChanges();

    const content = fixture.debugElement.query(By.css('.test-content'));
    expect(content).toBeNull();
  });

  it('debería mostrar el contenido si el tipo de documento no está en la lista', fakeAsync(() => {
    fixture.detectChanges();

    userDataSubject.next({
      dataBasicClientDto: { documentType: 'otro' }
    });

    flush();
    fixture.detectChanges();

    const content = fixture.debugElement.query(By.css('.test-content'));
    expect(content).not.toBeNull();
    expect(content.nativeElement.textContent).toContain('Contenido visible');
  }));
});
