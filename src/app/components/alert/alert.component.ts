import {Component, OnInit, Inject} from '@angular/core';
import {MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-alert-component',
    templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {

    title: string;
    message: string;

    constructor(public dialogRef: MatDialogRef<AlertComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        this.title = this.data['title'];
        this.message = this.data['message'];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
