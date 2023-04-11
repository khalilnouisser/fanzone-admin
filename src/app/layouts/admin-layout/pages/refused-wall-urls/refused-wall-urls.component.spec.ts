import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefusedWallUrlsComponent } from './refused-wall-urls.component';

describe('RefusedWallUrlsComponent', () => {
  let component: RefusedWallUrlsComponent;
  let fixture: ComponentFixture<RefusedWallUrlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefusedWallUrlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefusedWallUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
