import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericFilteringComponent } from './generic-filtering.component';

describe('GenericFilteringComponent', () => {
  let component: GenericFilteringComponent;
  let fixture: ComponentFixture<GenericFilteringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericFilteringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
