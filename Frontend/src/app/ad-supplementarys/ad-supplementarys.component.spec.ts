import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSupplementarysComponent } from './ad-supplementarys.component';

describe('AdSupplementarysComponent', () => {
  let component: AdSupplementarysComponent;
  let fixture: ComponentFixture<AdSupplementarysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdSupplementarysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdSupplementarysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
