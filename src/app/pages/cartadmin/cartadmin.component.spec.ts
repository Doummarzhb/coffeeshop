import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartadminComponent } from './cartadmin.component';

describe('CartadminComponent', () => {
  let component: CartadminComponent;
  let fixture: ComponentFixture<CartadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
