import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalItemuserComponent } from './total-itemuser.component';

describe('TotalItemuserComponent', () => {
  let component: TotalItemuserComponent;
  let fixture: ComponentFixture<TotalItemuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalItemuserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalItemuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
