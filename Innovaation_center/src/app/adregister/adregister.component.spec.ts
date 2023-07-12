import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdregisterComponent } from './adregister.component';

describe('AdregisterComponent', () => {
  let component: AdregisterComponent;
  let fixture: ComponentFixture<AdregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdregisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
