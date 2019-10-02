import { async, TestBed } from '@angular/core/testing';
import { DeletechannelComponent } from './deletechannel.component';
describe('DeletechannelComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DeletechannelComponent]
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
//# sourceMappingURL=deletechannel.component.spec.js.map