import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGoatComponent } from './add-edit-goat.component';

describe('AddEditGoatComponent', () => {
  let component: AddEditGoatComponent;
  let fixture: ComponentFixture<AddEditGoatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditGoatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditGoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
