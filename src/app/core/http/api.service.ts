import {Injectable} from '@angular/core';
import {environment} from './../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  users(): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/users')
      .toPromise()
      .catch(this.handleError);
  }

  addAdmin(body: any): Promise<any> {
    return this.http
      .post(environment.serverUrl + '/api/users', body)
      .toPromise()
      .catch(this.handleError);
  }

  login(body: any): Promise<any> {
    return this.http
      .post(environment.serverUrl + '/api/admin/login', body)
      .toPromise()
      .catch(this.handleError);
  }


  uploadImage(file: any, file_name: string, path: string): Promise<any> {
    const formData = new FormData();
    formData.append(file_name, file);
    return this.http
      .post(environment.serverUrl + '/api/' + path, formData)
      .toPromise()
      .catch(this.handleError);
  }

  groups(): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/users/group')
      .toPromise()
      .catch(this.handleError);
  }

  leagues(): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/leagues')
      .toPromise()
      .catch(this.handleError);
  }

  teams(): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/teams')
      .toPromise()
      .catch(this.handleError);
  }

  players(): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/players')
      .toPromise()
      .catch(this.handleError);
  }

  beforeMatchs(): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/matchs/before')
      .toPromise()
      .catch(this.handleError);
  }

  liveMatchs(): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/matchs/live/rate')
      .toPromise()
      .catch(this.handleError);
  }

  matchs(date: String): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/matchs?date=' + date)
      .toPromise()
      .catch(this.handleError);
  }

  quizs(): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/quiz/admin')
      .toPromise()
      .catch(this.handleError);
  }

  quizResponses(): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/quiz/response')
      .toPromise()
      .catch(this.handleError);
  }

  quizRequests(): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/quiz/request')
      .toPromise()
      .catch(this.handleError);
  }


  public extractData(res: Response) {
    const body = res.json();
    return body;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
