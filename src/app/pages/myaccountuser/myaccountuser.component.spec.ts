import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountuserComponent } from './myaccountuser.component';

describe('MyaccountuserComponent', () => {
  let component: MyaccountuserComponent;
  let fixture: ComponentFixture<MyaccountuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyaccountuserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyaccountuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
