//angular imports
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
//rxjs imports
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class UploadService {
    //private rootURL: string = 'http://ogrean.com/nomisign/'
    private rootURL: string = environment.serviceUrl;

    constructor(private http: Http) {}

    openBatch(rfcCode): Observable<any> {
        let _headers = new Headers ({'Content-Type': 'application/json'})
        let options = new RequestOptions({method: 'POST', headers: _headers})
        let url = this.rootURL + 'api/upload/openbatch/' + rfcCode;
        
        return this.http.post(url, {}, options).map(response => response.json());
    }

    addFile(file, batchId): Observable<any> {
        let _headers = new Headers ({'Content-Type': 'application/json'})
        let options = new RequestOptions({method: 'POST', headers: _headers})
        let url = this.rootURL + 'api/upload/addfile/' + batchId;
        let body = JSON.stringify(file);
        return this.http.post(url, body, options).map(response => response); //unexpected end of JSON
    }

    closeBatch(batchId): Observable<any> {
        let _headers = new Headers ({'Content-Type': 'application/json'})
        let options = new RequestOptions({method: 'POST', headers: _headers})
        let url = this.rootURL + 'api/upload/closebatch/' + batchId;
        
        return this.http.post(url, {}, options).map(response => response); //unexpected end of JSON
    }
}