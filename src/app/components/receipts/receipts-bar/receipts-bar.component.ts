import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-receipts-bar',
    templateUrl: './receipts-bar.component.html',
    styleUrls: ['./receipts-bar.component.css']
})
export class ReceiptsBarComponent implements OnInit {

    @Input()
    public companyId: number;

    public unsignedF = false;
    public rejectedF = false;
    public searchF = false;

    constructor(private router: Router) {
    }

    ngOnInit() {
        if (this.router.url.includes('unsigned')) {
            this.unsignedF = true;
        } else if (this.router.url.includes('rejected')) {
            this.rejectedF = true;
        } else if (this.router.url.includes('search')) {
            this.searchF = true;
        }
    }

}
