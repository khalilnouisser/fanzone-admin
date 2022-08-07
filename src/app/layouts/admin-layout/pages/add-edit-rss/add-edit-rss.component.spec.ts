import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRssComponent } from './add-edit-rss.component';

describe('AddEditRssComponent', () => {
  let component: AddEditRssComponent;
  let fixture: ComponentFixture<AddEditRssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditRssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
