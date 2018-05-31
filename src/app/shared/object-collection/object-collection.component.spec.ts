import { ObjectCollectionComponent } from './object-collection.component';
import { ViewMode } from '../../+search-page/search-options.model';
import { element } from 'protractor';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Config } from '../../../config/config.interface';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterStub } from '../testing/router-stub';

describe('ObjectCollectionComponent', () => {
  let fixture: ComponentFixture<ObjectCollectionComponent>;
  let objectCollectionComponent: ObjectCollectionComponent;

  const queryParam = 'test query';
  const scopeParam = '7669c72a-3f2a-451f-a3b9-9210e7a4c02f';
  const activatedRouteStub = {
    queryParams: Observable.of({
      query: queryParam,
      scope: scopeParam
    })
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectCollectionComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useClass: RouterStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();  // compile template and css
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ObjectCollectionComponent);
    objectCollectionComponent = fixture.componentInstance;

  }));
  it('should only show the grid component when the viewmode is set to grid', () => {
    objectCollectionComponent.currentMode = ViewMode.Grid;

    expect(fixture.debugElement.query(By.css('ds-object-grid'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('ds-object-list'))).toBeNull();
    expect(fixture.debugElement.query(By.css('ds-object-detail'))).toBeNull();
  });

  it('should only show the list component when the viewmode is set to list', () => {
    objectCollectionComponent.currentMode = ViewMode.List;

    expect(fixture.debugElement.query(By.css('ds-object-list'))).toBeDefined();
    expect(fixture.debugElement.query(By.css('ds-object-grid'))).toBeNull();
    expect(fixture.debugElement.query(By.css('ds-object-detail'))).toBeNull();
  })

  it('should only show the list component when the viewmode is set to detail', () => {
    objectCollectionComponent.currentMode = ViewMode.Detail;

    expect(fixture.debugElement.query(By.css('ds-object-list'))).toBeNull();
    expect(fixture.debugElement.query(By.css('ds-object-grid'))).toBeNull();
    expect(fixture.debugElement.query(By.css('ds-object-detail'))).toBeDefined();
  })

});
