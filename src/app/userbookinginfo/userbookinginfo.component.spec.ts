import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbookinginfoComponent } from './userbookinginfo.component';

describe('UserbookinginfoComponent', () => {
  let component: UserbookinginfoComponent;
  let fixture: ComponentFixture<UserbookinginfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserbookinginfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserbookinginfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
