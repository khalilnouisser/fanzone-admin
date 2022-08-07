import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuizsComponent } from './quizs.component';

describe('QuizsComponent', () => {
  let component: QuizsComponent;
  let fixture: ComponentFixture<QuizsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
