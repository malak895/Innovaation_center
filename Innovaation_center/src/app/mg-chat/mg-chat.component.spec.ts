import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MgChatComponent } from './mg-chat.component';

describe('MgChatComponent', () => {
  let component: MgChatComponent;
  let fixture: ComponentFixture<MgChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MgChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MgChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
