import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGoatsComponent } from './list-goats.component';

describe('ListGoatsComponent', () => {
  let component: ListGoatsComponent;
  let fixture: ComponentFixture<ListGoatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGoatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGoatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
