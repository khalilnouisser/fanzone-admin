import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSurveyComponent } from './add-edit-survey.component';

describe('AddEditSurveyComponent', () => {
  let component: AddEditSurveyComponent;
  let fixture: ComponentFixture<AddEditSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
