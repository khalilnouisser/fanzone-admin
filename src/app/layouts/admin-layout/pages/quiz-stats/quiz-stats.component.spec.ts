import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizStatsComponent } from './quiz-stats.component';

describe('QuizStatsComponent', () => {
  let component: QuizStatsComponent;
  let fixture: ComponentFixture<QuizStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
