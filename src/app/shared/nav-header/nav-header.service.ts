import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from './customer.model';
import { Url } from './url.model';
import { AppSetting } from './../../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Subscribe } from './subscribe.model';

@Injectable({
  providedIn: 'root'
})
export class NavHeaderService {
  serviceUrl: string = AppSetting.serviceUrl;
  headers: Headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });
  requestOptions: RequestOptions = new RequestOptions({ headers: this.headers });

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  constructor(private http: Http, private httpClient: HttpClient) { }
  createCustomer(data: any): Observable<any> {
    const addUrl = 'customers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Customer[]>(url, data);
  }
  copyUrl(data: Url): Observable<any> {
    const addUrl = 'copy';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Url>(url, data);
  }
  renameOriginalUrl(data: Url): Observable<any> {
    const addUrl = 'rename';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Url>(url, data);
  }
  renameOriginalCroppedUrl(data: Url): Observable<any> {
    const addUrl = 'renamecopy';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Url>(url, data);
  }
  resizeCopyUrl(data: Url): Observable<any> {
    const addUrl = 'resize';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Url>(url, data);
  }
  resizeRenameCopyUrl(data: Url): Observable<any> {
    const addUrl = 'resizerename';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Url>(url, data);
  }
  addPushSubscriber(subscribe: Subscribe) {
    const notificationUrl = 'pushnotificationsubscribe';
    const url: string = this.serviceUrl + notificationUrl;
    return this.http.post(url, subscribe);
  }
}
