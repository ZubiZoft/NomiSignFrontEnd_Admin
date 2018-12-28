import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Location} from '@angular/common';
import {DocumentService} from '../../services/documents.service';
import {DocumentDetail} from '../../models/documentDetail.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {UserService} from '../../services/user.service';
import {SessionTimeoutDialogComponent} from '../session-timeout-dialog/session-timeout-dialog.component';

@Component({
    selector: 'app-document-viewer',
    templateUrl: './document-viewer.component.html',
    styleUrls: ['./document-viewer.component.css']
})
export class DocumentViewerComponent implements OnInit {

    document: DocumentDetail = new DocumentDetail();
    isPromiseDone = false;

    constructor(private documentService: DocumentService, private route: ActivatedRoute, public dialog: MatDialog,
                private userService: UserService, private router: Router, private location: Location) {
    }

    ngOnInit() {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.documentService.getUserDocumentData(params.get('id')))
            .subscribe(data => {
                this.document = data;
                this.isPromiseDone = true;
            }, error => {
                if (error.status === 405) {
                    this.dialog.closeAll();
                    let dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
                        width: '75%'
                    });
                } else {
                    this.userService.clearUser();
                    this.router.navigate(['/login']);
                }
            });
    }

    showNomCert() {
        let dialogRef = this.dialog.open(Nom151DialogComponent, {
            width: '75%',
            height: '65%',
            data: {'message': this.document.NomCert}
        });
    }

    backNav() {
        this.location.back();
    }
}

@Component({
    selector: 'nom-151-dialog-component',
    templateUrl: 'nom-151-dialog-component.html',
})
export class Nom151DialogComponent implements OnInit {

    nomCert: string;

    constructor(public dialogRef: MatDialogRef<Nom151DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        this.nomCert = this.data['message'];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    copyClicboard(): void {
        let aux = document.createElement('textarea');
        aux.style.left = '0';
        aux.style.top = '0';
        aux.style.opacity = '0';
        aux.value = this.nomCert;
        document.body.appendChild(aux);
        aux.focus();
        aux.select();
        document.execCommand('copy');
        document.body.removeChild(aux);
    }
}
