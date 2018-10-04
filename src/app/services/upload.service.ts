//angular imports
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
//rxjs imports
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {FileUploadModel} from '../models/file-upload-model';
import {UserService} from './user.service';
import {FileModel} from '../models/file.model';
import {VerifySignatureRequest} from '../models/VerifySignatureRequest.model';

@Injectable()
export class UploadService {
    private rootURL: string = environment.serviceUrl;

    constructor(private http: Http, private userService: UserService) {
    }

    openBatch(companyId, openbatch): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'POST', headers: _headers});
        let url = this.rootURL + 'api/upload/openbatch/' + companyId;
        let body = JSON.stringify(openbatch);
        return this.http.post(url, body, options).map(response => response.json());
    }

    addFile(file, batchId): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'POST', headers: _headers});
        let url = this.rootURL + 'api/upload/addfile/' + batchId;
        let body = JSON.stringify(file);
        return this.http.post(url, body, options).map(response => response); //unexpected end of JSON
    }

    addcompanyfile(file, companyId): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'POST', headers: _headers});
        let url = this.rootURL + 'api/upload/addcompanyfile/' + companyId;
        let body = JSON.stringify(file);
        return this.http.post(url, body, options).map(response => response); //unexpected end of JSON
    }

    addEmployeeCSVFile(file, companyId): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'POST', headers: _headers});
        let url = this.rootURL + 'api/upload/ReadCSVFile/' + companyId;
        let mF = new FileModel();
        mF.PDFContent = file;
        let body = JSON.stringify(mF);
        return this.http.post(url, body, options).map(response => response); //unexpected end of JSON
    }

    addCompanyLogo(file: FileUploadModel, companyId): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'POST', headers: _headers});
        let url = this.rootURL + 'api/upload/addcompanylogo/' + companyId;
        let body = JSON.stringify(file);
        return this.http.post(url, body, options).map(response => response); //unexpected end of JSON
    }

    closeBatch(batchId): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'GET', headers: _headers});
        let url = this.rootURL + 'api/upload/closebatch/' + batchId;
        return this.http.get(url, options).map(response => response); //unexpected end of JSON
    }

    loadFiles(companyId, files: FileUploadModel[]): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'POST', headers: _headers});
        let url = this.rootURL + 'api/upload/uploadfilesfront/' + companyId;
        let body = JSON.stringify(files);
        return this.http.post(url, body, options).map(response => response);
    }

    verifySignatureOnDocument(req: VerifySignatureRequest): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'POST', headers: _headers});
        let url = this.rootURL + 'api/upload/verifySignatureOnDocument';
        let body = JSON.stringify(req);
        return this.http.post(url, body, options).map(response => response);
    }

    verifySignatureNoCert(req: VerifySignatureRequest): Observable<any> {
        const user = this.userService.getUser();
        var _headers = new Headers({
            'Content-Type': 'application/json',
            'ClientType': 'nomiadmin',
            'Authorization': 'Basic ' + user.SessionToken
        });
        let options = new RequestOptions({method: 'POST', headers: _headers});
        let url = this.rootURL + 'api/upload/verifySignatureOnDocumentNoCert';
        let body = JSON.stringify(req);
        return this.http.post(url, body, options).map(response => response);
    }
}
