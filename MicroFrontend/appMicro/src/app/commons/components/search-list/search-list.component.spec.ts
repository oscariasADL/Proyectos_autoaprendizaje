import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TestingModule } from '@testing/testing.module';
import { SearchListComponent } from './search-list.component';

describe('SearchListComponent', () => {
  let component: SearchListComponent;
  let fixture: ComponentFixture<SearchListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchListComponent],
      imports: [IonicModule, TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchListComponent);
    component = fixture.componentInstance;
    component.searchList = [
      {
        title: 'Tales',
        item: null
      }
    ];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search', () => {
    expect(component.search('tales')).toBeUndefined();
    component.search('');
    expect(component.listFilter).toEqual(component.searchList);
    expect(component.search('ar')).toBeUndefined();
  });

  it('should call ngOnChanges', () => {
    expect(
      component.ngOnChanges({ searchList: new SimpleChange(null, [], true) })
    ).toBeUndefined();
    expect(
      component.ngOnChanges({ searchList: new SimpleChange([], [], true) })
    ).toBeUndefined();
  });
});
