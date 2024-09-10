import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendResetEmailComponent } from './send-reset-email.component';

describe('SendResetEmailComponent', () => {
  let component: SendResetEmailComponent;
  let fixture: ComponentFixture<SendResetEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendResetEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendResetEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
