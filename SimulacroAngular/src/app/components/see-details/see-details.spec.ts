import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeDetails } from './see-details';

describe('SeeDetails', () => {
  let component: SeeDetails;
  let fixture: ComponentFixture<SeeDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
