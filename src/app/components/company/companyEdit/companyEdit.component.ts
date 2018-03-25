import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import {CompanyService} from '../../../services/company.service';
import {CompanyModel} from '../../../models/company.model';
import {States} from '../../../models/states.models';
import {UploadService} from '../../../services/upload.service';
import {FileModel} from '../../../models/file.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {FileUploadModel} from '../../../models/file-upload-model';
import * as shajs from 'sha.js';
import {UserService} from '../../../services/user.service';
import {SessionTimeoutDialogComponent} from '../../session-timeout-dialog/session-timeout-dialog.component';
import {HistoryPurchaseModel} from '../../../models/HistoryPurchaseModel';

declare global {
    interface Window {
        DOMParser: any;
    }

    interface Window {
        ActiveXObject: any;
    }
}

window.DOMParser = window.DOMParser || {};
window.ActiveXObject = window.ActiveXObject || {};

@Component({
    selector: 'ng-company',
    templateUrl: './companyEdit.component.html',
    styleUrls: ['./companyEdit.component.css'],
    providers: [CompanyService]
})

export class CompanyEditComponent implements OnInit {
    company: CompanyModel;
    id: string;
    states: States;
    isPromiseDone = false;
    files: any[];
    countFiles = 0;
    totalFiles = 0;
    fileUpload: FileUploadModel[] = [];
    showBtn = true;

    constructor(private route: ActivatedRoute, private companyService: CompanyService, public snackbar: MatSnackBar,
                private uploadService: UploadService, public dialog: MatDialog, private userService: UserService, private router: Router) {
        this.states = new States();
    }

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.companyService.getCompanyById(params.get('cid')))
            .subscribe(data => {
                this.company = data;
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

    addCompanyDocument() {
        if (this.files && this.files.length > 0) {
            for (let file of this.files) {
                this.uploadFile(file, this.company.CompanyId);
            }
            ;
        } else {
            let dialogRef = this.dialog.open(UploadedAlertDialog, {
                width: '50%',
                data: {'message': 'Por favor selecione un archivo.'}
            });
        }
        return false;
    }

    uploadFile(file, companyId): any {
        let uploadFile = new FileModel();
        uploadFile.FileName = file.name;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            uploadFile.PDFContent = reader.result.split(',')[1]; //removes data:image...
            this.uploadService.addcompanyfile(uploadFile, companyId).subscribe(
                userData => {
                    let dialogRef = this.dialog.open(UploadedAlertDialog, {
                        width: '50%',
                        data: {'message': 'Su documento de intercambio de claves y contraseñas ha sido cargado satisfactoriamente.'}
                    });
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
                }
            );
        };
    }

    onFileSelect(event) {
        this.files = event;
        this.company.NewEmployeeDocument = this.files[0].name;
    }

    updateCompany() {
        console.log('updating company');
        this.route.paramMap.switchMap(
            (params: ParamMap) => this.companyService.updateCompanyDetails(params.get('cid'),
                this.company).finally(
                () => this.snackbar.open('Cargados Exitosamente', '', {duration: 5000})))
            .subscribe(
                data => this.company = data, error => {
                    if (error.status === 405) {
                        this.dialog.closeAll();
                        let dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
                            width: '75%'
                        });
                    } else {
                        this.userService.clearUser();
                        this.router.navigate(['/login']);
                    }
                }
            );
    }

    onFileSelectDemo($event: any) {
        const filesPDF: { [name: string]: File } = {};
        const filesXML: { [name: string]: File } = {};
        let ref = this;

        var parseXml;

        if (typeof window.DOMParser != 'undefined') {
            parseXml = function (xmlStr) {
                return new window.DOMParser().parseFromString(xmlStr, 'text/xml');
            };
        } else if (typeof window.ActiveXObject != 'undefined' &&
            new window.ActiveXObject('Microsoft.XMLDOM')) {
            parseXml = function (xmlStr) {
                var xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
                xmlDoc.async = 'false';
                xmlDoc.loadXML(xmlStr);
                return xmlDoc;
            };
        } else {
            throw new Error('No XML parser found');
        }

        for (const f of $event.target.files) {
            const file: File = f;
            if (file.type.toLowerCase() == 'text/xml') {
                filesXML[this.removeExtension(file.name)] = file;
            }
            if (file.type.toLowerCase() == 'application/pdf') {
                filesPDF[this.removeExtension(file.name)] = file;
            }
        }

        for (const f in filesXML) {
            if (filesPDF.hasOwnProperty(f)) {
                const file: FileUploadModel = new FileUploadModel();
                const myReaderXML: FileReader = new FileReader();
                myReaderXML.onloadend = function (e) {
                    // you can perform an action with readed data here
                    const xml = parseXml(myReaderXML.result);
                    if (!ref.checkRfcXmlAtrr(xml, ref)) {
                        return;
                    }
                    file.FileName = f;
                    ref.totalFiles++;
                    file.XMLContent = myReaderXML.result;
                    file.FileHash = shajs('sha256').update(file.XMLContent).digest('hex');
                    const myReaderPDF: FileReader = new FileReader();
                    myReaderPDF.onloadend = function (e) {
                        // you can perform an action with readed data here
                        file.PDFContent = btoa(myReaderPDF.result);
                        ref.fileUpload.push(file);
                        ref.countFiles++;
                    };
                    myReaderPDF.readAsBinaryString(filesPDF[f]);
                };
                myReaderXML.readAsText(filesXML[f]);
            }
        }
    }

    checkRfcXmlAtrr(xml, ref) {
        try {
            if (xml.getElementsByTagName('cfdi:Emisor')[0].getAttribute('rfc') == ref.company.CompanyRFC) {
                return true;
            }
        } catch (ex) {
        }
        try {
            if (xml.getElementsByTagName('cfdi:Emisor')[0].getAttribute('Rfc') == ref.company.CompanyRFC) {
                return true;
            }
        } catch (ex) {
        }
        try {
            if (xml.getElementsByTagName('cfdi:Emisor')[0].getAttribute('RFC') == ref.company.CompanyRFC) {
                return true;
            }
        } catch (ex) {
        }
        try {
            if (xml.getElementsByTagName('cfdi:emisor')[0].getAttribute('rfc') == ref.company.CompanyRFC) {
                return true;
            }
        } catch (ex) {
        }
        try {
            if (xml.getElementsByTagName('cfdi:emisor')[0].getAttribute('Rfc') == ref.company.CompanyRFC) {
                return true;
            }
        } catch (ex) {
        }
        try {
            if (xml.getElementsByTagName('cfdi:emisor')[0].getAttribute('RFC') == ref.company.CompanyRFC) {
                return true;
            }
        } catch (ex) {
        }
        return false;
    }

    removeExtension(name: string) {
        const arr: string[] = name.split('.');
        let realName = '';

        for (var i = 0; i < arr.length - 1; i++) {
            realName += arr[i];
        }

        if (realName == '') {
            realName = name;
        }
        return realName;
    }

    showPurchaseDialog() {
        this.companyService.getPurchaseSignature(this.company.CompanyId)
            .subscribe(data => {
                let dialogRef = this.dialog.open(PurchaseHistoryDialog, {
                    width: '75%',
                    data: {'history': data}
                });
            }, error => {
                if (error.status === 405) {
                    this.dialog.closeAll();
                    let dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
                        width: '75%'
                    });
                }
            });
    }

    uploadDocuments() {
        this.showBtn = false;
        this.uploadService.loadFiles(this.company.CompanyId, this.fileUpload)
            .subscribe(data => {
                this.fileUpload = [];
                this.showBtn = true;
                let dialogRef = this.dialog.open(UploadedAlertDialog, {
                    width: '75%',
                    data: {'message': 'Los recibos de nóminas han sido cargados satisfactoriamente'}
                });
                //this.snackbar.open('Updated successfully', '', {duration: 5000});
            }, error => {
                if (error.status === 405) {
                    this.dialog.closeAll();
                    let dialogRef = this.dialog.open(SessionTimeoutDialogComponent, {
                        width: '75%'
                    });
                } else if (error.status === 409) {
                    let dialogRef = this.dialog.open(UploadedAlertDialog, {
                        width: '60%',
                        data: {
                            'message': 'El número de firmas disponibles no son suficientes para el número de documentos que intentas ' +
                            'cargar. Por favor contacta a tu represante de ventas para obtner más firmas.'
                        }
                    });
                    this.showBtn = true;
                } else {
                    let dialogRef = this.dialog.open(UploadedAlertDialog, {
                        width: '60%',
                        data: {
                            'message': '¡Hubo un error al cargar sus nóminas, por favor verifique su conexión de internet!, '
                            + 'en caso de que el error persista, favor de contactar al equipo de Nomisign.'
                        }
                    });
                    this.showBtn = true;
                }
            });
    }
}

@Component({
    selector: 'uploaded-alert-dialog',
    templateUrl: 'uploaded-alert-dialog.html'
})
export class UploadedAlertDialog implements OnInit {

    constructor(public dialogRef: MatDialogRef<UploadedAlertDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    loginMessage: string;

    ngOnInit() {
        this.loginMessage = this.data['message'];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}

@Component({
    selector: 'purchase-history-dialog',
    templateUrl: 'purchase-history-dialog.html'
})
export class PurchaseHistoryDialog implements OnInit {

    history: HistoryPurchaseModel[];

    constructor(public dialogRef: MatDialogRef<PurchaseHistoryDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        this.history = this.data['history'];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
