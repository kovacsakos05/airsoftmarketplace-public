import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdGunsComponent } from './ad-guns.component';

describe('AdGunsComponent', () => {
  let component: AdGunsComponent;
  let fixture: ComponentFixture<AdGunsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdGunsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdGunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
