import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuizResponsesComponent } from './quiz-responses.component';

describe('QuizResponsesComponent', () => {
  let component: QuizResponsesComponent;
  let fixture: ComponentFixture<QuizResponsesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizResponsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
