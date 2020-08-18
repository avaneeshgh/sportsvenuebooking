import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindvenueComponent } from './findvenue.component';

describe('FindvenueComponent', () => {
  let component: FindvenueComponent;
  let fixture: ComponentFixture<FindvenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindvenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindvenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
