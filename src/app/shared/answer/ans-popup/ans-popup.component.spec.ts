import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsPopupComponent } from './ans-popup.component';

describe('AnsPopupComponent', () => {
  let component: AnsPopupComponent;
  let fixture: ComponentFixture<AnsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnsPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
