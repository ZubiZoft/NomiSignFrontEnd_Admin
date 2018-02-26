import {Component} from '@angular/core';
import {CompanyModel} from '../../../models/company.model';
import {CompanyService} from '../../../services/company.service';
import {States} from '../../../models/states.models';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UploadedAlertDialog} from '../companyEdit/companyEdit.component';
import {Location} from '@angular/common';

@Component({
    selector: 'ng-newcompany',
    templateUrl: './companyNew.component.html',
    styleUrls: ['./companyNew.component.css'],
    providers: [CompanyService]
})
export class CompanyNewComponent {
    company: CompanyModel;
    id: string;
    states: States;

    constructor(private companyService: CompanyService, public snackbar: MatSnackBar,
                public dialog: MatDialog, private _location: Location) {
        this.states = new States();
        this.company = new CompanyModel();
        this.company.State = 'Ciudad de México';
    }

    saveCompany() {
        this.companyService.saveNewCompany(this.company).subscribe(
            data => {
                this.company = data;
                const dialogRef = this.dialog.open(UploadedAlertDialog, {
                    width: '50%',
                    data: {'message': '¡Su compañia ha sido creada satisfactoriamente!'}
                });
                dialogRef.afterClosed().subscribe(result => {
                    this._location.back();
                });
            },
            error => {
                this.snackbar.open(error, '', {duration: 5000});
                const dialogRef = this.dialog.open(UploadedAlertDialog, {
                    width: '50%',
                    data: {'message': '¡Hubo un error al crear su compañía, por favor intente más tarde!'}
                });
            },
            () => this.snackbar.open('Successfully updated', '', {duration: 5000})
        );
    }
}
