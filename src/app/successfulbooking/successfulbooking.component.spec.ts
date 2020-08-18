import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulbookingComponent } from './successfulbooking.component';

describe('SuccessfulbookingComponent', () => {
  let component: SuccessfulbookingComponent;
  let fixture: ComponentFixture<SuccessfulbookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulbookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
