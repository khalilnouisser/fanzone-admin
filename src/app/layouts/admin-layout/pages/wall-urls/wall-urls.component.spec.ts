import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallUrlsComponent } from './wall-urls.component';

describe('WallUrlsComponent', () => {
  let component: WallUrlsComponent;
  let fixture: ComponentFixture<WallUrlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallUrlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
