import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletechannelComponent } from './deletechannel.component';

describe('DeletechannelComponent', () => {
  let component: DeletechannelComponent;
  let fixture: ComponentFixture<DeletechannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletechannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletechannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
