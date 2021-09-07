import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRequestsComponent } from './quiz-requests.component';

describe('QuizRequestsComponent', () => {
  let component: QuizRequestsComponent;
  let fixture: ComponentFixture<QuizRequestsComponent>;

  beforeEach(async(() => {
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
