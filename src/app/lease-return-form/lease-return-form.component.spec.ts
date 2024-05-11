import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseReturnFormComponent } from './lease-return-form.component';

describe('LeaseReturnFormComponent', () => {
  let component: LeaseReturnFormComponent;
  let fixture: ComponentFixture<LeaseReturnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaseReturnFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaseReturnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
