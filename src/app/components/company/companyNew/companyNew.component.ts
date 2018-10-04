import {Component} from '@angular/core';
import {CompanyModel} from '../../../models/company.model';
import {CompanyService} from '../../../services/company.service';
import {States} from '../../../models/states.models';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UploadedAlertDialog} from '../companyEdit/companyEdit.component';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {SessionTimeoutDialogComponent} from '../../session-timeout-dialog/session-timeout-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
    isPromiseDone: boolean;
    form: FormGroup;

    constructor(private companyService: CompanyService, public snackbar: MatSnackBar, private formBuilder: FormBuilder,
                public dialog: MatDialog, private userService: UserService, private router: Router, private _location: Location) {
        this.states = new States();
        this.company = new CompanyModel();
        this.company.State = 'Ciudad de México';
        this.isPromiseDone = true;
        this.form = formBuilder.group({
            'companyName': [null, Validators.required],
            'companyRFC': [null, Validators.required],
            'billingEmail': [null, Validators.compose([Validators.email, Validators.required])],
            'supportPhone': [null, Validators.compose([Validators.required])],
            'supportEmail': [null, Validators.compose([Validators.required, Validators.email])],
            'companyZipCode': [null, Validators.compose([ Validators.minLength(5), Validators.maxLength(5),
                Validators.pattern('^[0-9]{5}$')])],
        });
    }

    saveCompany() {
        this.isPromiseDone = false;
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
                this.isPromiseDone = false;
            }, error => {
                if (error.status === 405) {
                    this.dialog.closeAll();
                    let dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
                        width: '75%'
                    });
                } else {
                    this.snackbar.open(error, '', {duration: 5000});
                    const dialogRef = this.dialog.open(UploadedAlertDialog, {
                        width: '50%',
                        data: {'message': '¡Hubo un error al crear su compañía, por favor intente más tarde!'}
                    });
                }
            }, () => this.snackbar.open('Cargados Exitosamente', '', {duration: 5000})
        );
    }
}
