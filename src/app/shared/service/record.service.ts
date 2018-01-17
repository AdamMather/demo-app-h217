import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Record } from '../../core/record.model';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class RecordService {

  public record: any;

  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) { }


    importCsv(): Observable<any> {
    return this.http.get('/api/portal/csv/import')
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error.json().error || 'Server error'));
  }

  uploadCsv(formData: FormData): Observable<any> {
    return this.http.post('/api/portal/file/upload', formData)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw(error.json().error || 'Server error'));
  }

  getAllRecords(): Observable<any> {
    // set json header information
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // gather request options
    let options = new RequestOptions({ headers: headers });
    // return all records to the component
    return this.http.get('/api/portal', options)
      .map(response => (response.json() as Object[]).map(record => new Record(record)))
      .catch(error => Observable.throw(error.json().error || 'Server error'))
  }

  getRecordBySearchParam(search: string): Observable<any> {
    // set json header information
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params: URLSearchParams = new URLSearchParams();

    if (search) {
      params.set('query', search);
    }
    // gather request options
    let options = new RequestOptions({ headers: headers, search: params });
    // return all records to the component
    return this.http.get('/api/portal/search/' + search, options)
      .map(response => (response.json() as Object[]).map(record => new Record(record)))
      .catch(error => Observable.throw(error.json().error || 'Server error'))
  }

  getRecordById(id: string): Observable<Record> {
    // set json header information
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // gather request options
    let options = new RequestOptions({ headers: headers });
    //
    return this.http.get('/api/portal/' + id, options)
      .map((res: Response) => new Record(res.json()))
      .catch(error => Observable.throw(error.json().error || 'Server error'))
  }

  createRecord(record: Record): Observable<Record> {
    // set json header information
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // gather request options
    let options = new RequestOptions({ headers: headers });
    // fetch form data and submit to MongoDB api service
    return this.http.post('/api/portal', record, options).map(res => new Record(res.json()))
  }

  updateRecord(record: Record): Observable<Record> {
    // set json header information
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // gather request options
    let options = new RequestOptions({ headers: headers });
    // fetch form data and submit to MongoDB api service
    return this.http.patch('/api/portal', record, options).map(res => new Record(res.json()))
  }

  deleteRecord(id: string): Observable<Record> {

    // fetch the current record id used to delete to record from the MongoDB database
    return this.http.delete('api/portal/' + id).map(res => res.json());
  }

}

export class SearchFilter {
  public searchStr: string;
}