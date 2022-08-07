import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuizRequestsComponent } from './quiz-requests.component';

describe('QuizRequestsComponent', () => {
  let component: QuizRequestsComponent;
  let fixture: ComponentFixture<QuizRequestsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
