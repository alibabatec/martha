import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterationSetPasswordComponent } from './registerationsetpassword.component';

describe('RegisterationsetpasswordComponent', () => {
  let component: RegisterationSetPasswordComponent;
  let fixture: ComponentFixture<RegisterationSetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterationSetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterationSetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
