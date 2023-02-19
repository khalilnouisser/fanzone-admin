import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWallLinkComponent } from './add-edit-wall-link.component';

describe('AddEditWallLinkComponent', () => {
  let component: AddEditWallLinkComponent;
  let fixture: ComponentFixture<AddEditWallLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditWallLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditWallLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
