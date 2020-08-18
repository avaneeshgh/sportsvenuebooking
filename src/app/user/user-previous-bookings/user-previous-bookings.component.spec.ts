import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPreviousBookingsComponent } from './user-previous-bookings.component';

describe('UserPreviousBookingsComponent', () => {
  let component: UserPreviousBookingsComponent;
  let fixture: ComponentFixture<UserPreviousBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPreviousBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPreviousBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
