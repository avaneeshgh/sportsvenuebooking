import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaticularComponent } from './paticular.component';

describe('PaticularComponent', () => {
  let component: PaticularComponent;
  let fixture: ComponentFixture<PaticularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaticularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
