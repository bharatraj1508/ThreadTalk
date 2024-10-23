import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsCardComponent } from './ans-card.component';

describe('AnsCardComponent', () => {
  let component: AnsCardComponent;
  let fixture: ComponentFixture<AnsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
