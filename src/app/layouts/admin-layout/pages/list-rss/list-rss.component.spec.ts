import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRssComponent } from './list-rss.component';

describe('ListRssComponent', () => {
  let component: ListRssComponent;
  let fixture: ComponentFixture<ListRssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
