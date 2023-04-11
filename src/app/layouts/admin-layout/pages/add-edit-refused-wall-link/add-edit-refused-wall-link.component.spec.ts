import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRefusedWallLinkComponent } from './add-edit-refused-wall-link.component';

describe('AddEditRefusedWallLinkComponent', () => {
  let component: AddEditRefusedWallLinkComponent;
  let fixture: ComponentFixture<AddEditRefusedWallLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRefusedWallLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRefusedWallLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
