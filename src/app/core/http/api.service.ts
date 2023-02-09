import {Injectable} from '@angular/core';
import {environment} from './../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  users(filterData: any = null, page: number, limit: number): Promise<any> {
    return this.http.get(environment.serverUrl + `/api/users?skip=${(page - 1) * limit}&limit=${limit}`  + this.getParams(filterData))
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

  groups(filterData: any = null, page: number, limit: number): Promise<any> {
    return this.http.get(environment.serverUrl + `/api/users/group?skip=${(page - 1) * limit}&limit=${limit}` + this.getParams(filterData))
      .toPromise()
      .catch(this.handleError);
  }

  leagues(filterData: any = null, page: number, limit: number): Promise<any> {
    return this.http.get(environment.serverUrl + `/api/leagues?skip=${(page - 1) * limit}&limit=${limit}` + this.getParams(filterData))
      .toPromise()
      .catch(this.handleError);
  }

  teams(filterData: any = null, page: number, limit: number): Promise<any> {
    return this.http.get(environment.serverUrl + `/api/teams?skip=${(page - 1) * limit}&limit=${limit}` + this.getParams(filterData))
      .toPromise()
      .catch(this.handleError);
  }

  teamById(id: string): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/teams?_id=' + id)
      .toPromise()
      .catch(this.handleError);
  }

  editTeam(id: string, body: any): Promise<any> {
    return this.http.put(environment.serverUrl + '/api/teams/' + id, body)
      .toPromise()
      .catch(this.handleError);
  }

  players(filterData: any = null, page: number, limit: number): Promise<any> {
    return this.http.get(environment.serverUrl + `/api/players?skip=${(page - 1) * limit}&limit=${limit}` + this.getParams(filterData))
      .toPromise()
      .catch(this.handleError);
  }

  playerById(id: string): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/players?_id=' + id)
      .toPromise()
      .catch(this.handleError);
  }

  editPlayer(id: string, body: any): Promise<any> {
    return this.http.put(environment.serverUrl + '/api/players/' + id, body)
      .toPromise()
      .catch(this.handleError);
  }

  rss(filterData: any = null, page: number, limit: number): Promise<any> {
    return this.http.get(environment.serverUrl + `/api/rss?skip=${(page - 1) * limit}&limit=${limit}` + this.getParams(filterData))
      .toPromise()
      .catch(this.handleError);
  }

  deleteRss(id: string): Promise<any> {
    return this.http.delete(environment.serverUrl + '/api/rss/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  rssById(id: string): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/rss?_id=' + id)
      .toPromise()
      .catch(this.handleError);
  }

  editRss(id: string, body: any): Promise<any> {
    return this.http.put(environment.serverUrl + '/api/rss/' + id, body)
      .toPromise()
      .catch(this.handleError);
  }

  addRss(body: any): Promise<any> {
    return this.http.post(environment.serverUrl + '/api/rss/', body)
      .toPromise()
      .catch(this.handleError);
  }

  editConfig(id: string, body: any): Promise<any> {
    return this.http.put(environment.serverUrl + '/api/config/' + id, body)
      .toPromise()
      .catch(this.handleError);
  }

  getConfig(): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/config')
      .toPromise()
      .catch(this.handleError);
  }

  languages(): any {
    return [
      {'id': 'fr', 'value': 'Français'},
      {'id': 'en', 'value': 'Anglais'},
      {'id': 'es', 'value': 'Espagnol'},
      {'id': 'zh', 'value': 'Chinois'},
      {'id': 'ar', 'value': 'Arabe'},
      {'id': 'pt', 'value': 'Portugais'},
      {'id': 'it', 'value': 'Italien'},
      {'id': 'tr', 'value': 'Turque'},
      {'id': 'ja', 'value': 'Japonais'},
      {'id': 'ru', 'value': 'Russe'},
      {'id': 'ko', 'value': 'Coréen'},
      {'id': 'de', 'value': 'Allemand'},
      {'id': 'fa', 'value': 'Perse'}
    ];
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

  matchs(filterData: any = null, date: String): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/matchs?date=' + date  + this.getParams(filterData))
      .toPromise()
      .catch(this.handleError);
  }

  quizs(filterData: any = null, page: number, limit: number): Promise<any> {
    return this.http.get(environment.serverUrl + `/api/quiz/admin?skip=${(page - 1) * limit}&limit=${limit}` + this.getParams(filterData))
      .toPromise()
      .catch(this.handleError);
  }

  addQuiz(body: any): Promise<any> {
    return this.http.post(environment.serverUrl + '/api/quiz/generate', body)
      .toPromise()
      .catch(this.handleError);
  }

  quizResponses(page: number, limit: number): Promise<any> {
    return this.http.get(environment.serverUrl + `/api/quiz/response?skip=${(page - 1) * limit}&limit=${limit}`)
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

  getParams(filterData: any): string {
    console.log(filterData);
    return filterData ? ('&' + Object.keys(filterData).filter(k => filterData[k] !== '').map(k => {
      return `${k}=${filterData[k]}`;
    }).join('&')) : '';
  }
}
