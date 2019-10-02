import { async, TestBed } from '@angular/core/testing';
import { DeleteuserComponent } from './deleteuser.component';
describe('DeleteuserComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DeleteuserComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteuserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=deleteuser.component.spec.js.map