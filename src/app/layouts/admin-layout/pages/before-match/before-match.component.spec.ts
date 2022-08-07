import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BeforeMatchComponent } from './before-match.component';

describe('BeforeMatchComponent', () => {
  let component: BeforeMatchComponent;
  let fixture: ComponentFixture<BeforeMatchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
