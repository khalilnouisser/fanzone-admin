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

  addAlertToUser(id: string, body: any): Promise<any> {
    return this.http.put(environment.serverUrl + '/api/users/' + id + '/alert', body)
      .toPromise()
      .catch(this.handleError);
  }

  editUser(id: string, body: any): Promise<any> {
    return this.http.put(environment.serverUrl + '/api/users/' + id + '/admin', body)
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

  editGroup(id: string, body: any): Promise<any> {
    return this.http.put(environment.serverUrl + '/api/users/group/' + id, body)
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

  linkRequests(filterData: any = null, page: number, limit: number): Promise<any> {
    return this.http.get(environment.serverUrl + `/api/wall/demands?skip=${(page - 1) * limit}&limit=${limit}` + this.getParams(filterData))
      .toPromise()
      .catch(this.handleError);
  }

  acceptWall(id: string, body: any): Promise<any> {
    return this.http.put(environment.serverUrl + '/api/wall/' + id + '/accept', body)
      .toPromise()
      .catch(this.handleError);
  }

  refuseWall(id: string, body: any): Promise<any> {
    return this.http.put(environment.serverUrl + '/api/wall/' + id + '/refuse', body)
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

  wallLinks(filterData: any = null, page: number, limit: number): Promise<any> {
    return this.http.get(environment.serverUrl + `/api/wall/links?skip=${(page - 1) * limit}&limit=${limit}` + this.getParams(filterData))
      .toPromise()
      .catch(this.handleError);
  }

  deleteWallLink(id: string): Promise<any> {
    return this.http.delete(environment.serverUrl + '/api/wall/links/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  wallLinkById(id: string): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/wall/links?_id=' + id)
      .toPromise()
      .catch(this.handleError);
  }

  editWallLink(id: string, body: any): Promise<any> {
    return this.http.put(environment.serverUrl + '/api/wall/links/' + id, body)
      .toPromise()
      .catch(this.handleError);
  }

  refusedWallLinks(filterData: any = null, page: number, limit: number): Promise<any> {
    return this.http.get(environment.serverUrl + `/api/wall/refused-links?skip=${(page - 1) * limit}&limit=${limit}` + this.getParams(filterData))
      .toPromise()
      .catch(this.handleError);
  }

  deleteRefusedWallLink(id: string): Promise<any> {
    return this.http.delete(environment.serverUrl + '/api/wall/refused-links/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  refusedWallLinkById(id: string): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/wall/refused-links?_id=' + id)
      .toPromise()
      .catch(this.handleError);
  }

  editRefusedWallLink(id: string, body: any): Promise<any> {
    return this.http.put(environment.serverUrl + '/api/wall/refused-links/' + id, body)
      .toPromise()
      .catch(this.handleError);
  }

  walls(filterData: any = null, page: number, limit: number): Promise<any> {
    return this.http.get(environment.serverUrl + `/api/wall/admin?skip=${(page - 1) * limit}&limit=${limit}` + this.getParams(filterData))
      .toPromise()
      .catch(this.handleError);
  }

  translate(body: any): Promise<any> {
    return this.http.post(environment.serverUrl + '/api/google/translate/', body)
      .toPromise()
      .catch(this.handleError);
  }

  deleteWall(id: string): Promise<any> {
    return this.http.delete(environment.serverUrl + '/api/wall/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  wallById(id: string): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/wall/admin?_id=' + id)
      .toPromise()
      .catch(this.handleError);
  }

  editWall(id: string, body: any): Promise<any> {
    return this.http.put(environment.serverUrl + '/api/wall/' + id, body)
      .toPromise()
      .catch(this.handleError);
  }

  addWall(body: any): Promise<any> {
    return this.http.post(environment.serverUrl + '/api/wall/', body)
      .toPromise()
      .catch(this.handleError);
  }

  addWallLink(body: any): Promise<any> {
    return this.http.post(environment.serverUrl + '/api/wall/links/', body)
      .toPromise()
      .catch(this.handleError);
  }

  addRefusedWallLink(body: any): Promise<any> {
    return this.http.post(environment.serverUrl + '/api/wall/refused-links/', body)
      .toPromise()
      .catch(this.handleError);
  }

  tickets(filterData: any = null, page: number, limit: number): Promise<any> {
    return this.http.get(environment.serverUrl + `/api/tickets?skip=${(page - 1) * limit}&limit=${limit}` + this.getParams(filterData))
      .toPromise()
      .catch(this.handleError);
  }

  ticketById(id: string): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/tickets?_id=' + id)
      .toPromise()
      .catch(this.handleError);
  }

  addTicketComment(id: string, content: string): Promise<any> {
    return this.http.post(environment.serverUrl + '/api/tickets/' + id + '/comment', {
      content: content,
    })
      .toPromise()
      .catch(this.handleError);
  }

  editTicket(id: string, body: any): Promise<any> {
    return this.http.put(environment.serverUrl + '/api/tickets/' + id, body)
      .toPromise()
      .catch(this.handleError);
  }

  goats(filterData: any = null, page: number, limit: number): Promise<any> {
    return this.http.get(environment.serverUrl + `/api/goat?skip=${(page - 1) * limit}&limit=${limit}` + this.getParams(filterData))
      .toPromise()
      .catch(this.handleError);
  }

  deleteGoat(id: string): Promise<any> {
    return this.http.delete(environment.serverUrl + '/api/goat/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  goatById(id: string): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/goat?_id=' + id)
      .toPromise()
      .catch(this.handleError);
  }

  editGoat(id: string, body: any): Promise<any> {
    return this.http.put(environment.serverUrl + '/api/goat/' + id, body)
      .toPromise()
      .catch(this.handleError);
  }

  addGoat(body: any): Promise<any> {
    return this.http.post(environment.serverUrl + '/api/goat/', body)
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

  getFantazies(): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/fantazy')
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

  ticketStates(): any {
    return ['Waiting', 'En cours', 'Fait', 'Fermé'];
  }

  ticketStatesClass(): any {
    return ['badge-warning', 'badge-info', 'badge-success', 'badge-secondary', 'badge-danger'];
  }

  ticketTypes(): any {
    return ['Suggestion', 'Bug', 'Report', 'Signalement'];
  }

  fullLanguages(): any[] {
    return [
      {'id': 'fr', 'name': 'Français'},
      {'id': 'en', 'name': 'Anglais'},
      {'id': 'es', 'name': 'Espagnol'},
      {'id': 'zh', 'name': 'Chinois'},
      {'id': 'ar', 'name': 'Arabe'},
      {'id': 'pt', 'name': 'Portugais'},
      {'id': 'it', 'name': 'Italien'},
      {'id': 'tr', 'name': 'Turque'},
      {'id': 'ja', 'name': 'Japonais'},
      {'id': 'ru', 'name': 'Russe'},
      {'id': 'ko', 'name': 'Coréen'},
      {'id': 'de', 'name': 'Allemand'},
      {'id': 'per', 'name': 'Persan'},
      {'id': 'XXX', 'name': 'Autre'},
      {'id': '-', 'name': '-----------------'},
      // tslint:disable-next-line:max-line-length
      {'id': 'aar', 'name': 'Afar'}, {'id': 'abk', 'name': 'Abkhaze'}, {'id': 'ave', 'name': 'Avestique'}, {'id': 'afr', 'name': 'Afrikaans'}, {'id': 'aka', 'name': 'Akan'}, {'id': 'amh', 'name': 'Amharique'}, {'id': 'arg', 'name': 'Aragonais'}, {'id': 'asm', 'name': 'Assamais'}, {'id': 'ava', 'name': 'Avar'}, {'id': 'aym', 'name': 'Aymara'}, {'id': 'aze', 'name': 'Azéri'}, {'id': 'bak', 'name': 'Bachkir'}, {'id': 'bel', 'name': 'Biélorusse'}, {'id': 'bul', 'name': 'Bulgare'}, {'id': 'bih', 'name': 'Bihari'}, {'id': 'bis', 'name': 'Bichelamar'}, {'id': 'bam', 'name': 'Bambara'}, {'id': 'ben', 'name': 'Bengali'}, {'id': 'tib', 'name': 'Tibétain'}, {'id': 'bre', 'name': 'Breton'}, {'id': 'bos', 'name': 'Bosnien'}, {'id': 'cat', 'name': 'Catalan'}, {'id': 'che', 'name': 'Tchétchène'}, {'id': 'cha', 'name': 'Chamorro'}, {'id': 'cos', 'name': 'Corse'}, {'id': 'cre', 'name': 'Cri'}, {'id': 'cze', 'name': 'Tchèque'}, {'id': 'chu', 'name': 'Vieux-slave'}, {'id': 'chv', 'name': 'Tchouvache'}, {'id': 'wel', 'name': 'Gallois'}, {'id': 'dan', 'name': 'Danois'}, {'id': 'div', 'name': 'Maldivien'}, {'id': 'dzo', 'name': 'Dzongkha'}, {'id': 'ewe', 'name': 'Ewe'}, {'id': 'gre', 'name': 'Grec moderne'}, {'id': 'epo', 'name': 'Espéranto'}, {'id': 'est', 'name': 'Estonien'}, {'id': 'baq', 'name': 'Basque'}, {'id': 'ful', 'name': 'Peul'}, {'id': 'fin', 'name': 'Finnois'}, {'id': 'fij', 'name': 'Fidjien'}, {'id': 'fao', 'name': 'Féroïen'}, {'id': 'fry', 'name': 'Frison occidental'}, {'id': 'gle', 'name': 'Irlandais'}, {'id': 'gla', 'name': 'Écossais'}, {'id': 'glg', 'name': 'Galicien'}, {'id': 'grn', 'name': 'Guarani'}, {'id': 'guj', 'name': 'Gujarati'}, {'id': 'glv', 'name': 'Mannois'}, {'id': 'hau', 'name': 'Haoussa'}, {'id': 'heb', 'name': 'Hébreu'}, {'id': 'hin', 'name': 'Hindi'}, {'id': 'hmo', 'name': 'Hiri motu'}, {'id': 'hrv', 'name': 'Croate'}, {'id': 'hat', 'name': 'Créole haïtien'}, {'id': 'hun', 'name': 'Hongrois'}, {'id': 'arm', 'name': 'Arménien'}, {'id': 'her', 'name': 'Héréro'}, {'id': 'ina', 'name': 'Interlingua'}, {'id': 'ind', 'name': 'Indonésien'}, {'id': 'ile', 'name': 'Occidental'}, {'id': 'ibo', 'name': 'Igbo'}, {'id': 'iii', 'name': 'Yi'}, {'id': 'ipk', 'name': 'Inupiak'}, {'id': 'ido', 'name': 'Ido'}, {'id': 'isl', 'name': 'Islandais'}, {'id': 'iku', 'name': 'Inuktitut'}, {'id': 'jav', 'name': 'Javanais'}, {'id': 'geo', 'name': 'Géorgien'}, {'id': 'kon', 'name': 'Kikongo'}, {'id': 'kik', 'name': 'Kikuyu'}, {'id': 'kua', 'name': 'Kuanyama'}, {'id': 'kaz', 'name': 'Kazakh'}, {'id': 'kal', 'name': 'Groenlandais'}, {'id': 'khm', 'name': 'Khmer'}, {'id': 'kan', 'name': 'Kannada'}, {'id': 'kau', 'name': 'Kanouri'}, {'id': 'kas', 'name': 'Cachemiri'}, {'id': 'kur', 'name': 'Kurde'}, {'id': 'kom', 'name': 'Komi'}, {'id': 'cor', 'name': 'Cornique'}, {'id': 'kir', 'name': 'Kirghiz'}, {'id': 'lat', 'name': 'Latin'}, {'id': 'ltz', 'name': 'Luxembourgeois'}, {'id': 'lug', 'name': 'Ganda'}, {'id': 'lim', 'name': 'Limbourgeois'}, {'id': 'lin', 'name': 'Lingala'}, {'id': 'lao', 'name': 'Lao'}, {'id': 'lit', 'name': 'Lituanien'}, {'id': 'lub', 'name': 'Luba'}, {'id': 'lav', 'name': 'Letton'}, {'id': 'mlg', 'name': 'Malgache'}, {'id': 'mah', 'name': 'Marshallais'}, {'id': 'mao', 'name': 'Maori de Nouvelle-Zélande'}, {'id': 'mac', 'name': 'Macédonien'}, {'id': 'mal', 'name': 'Malayalam'}, {'id': 'mon', 'name': 'Mongol'}, {'id': 'mol', 'name': 'Moldave'}, {'id': 'mar', 'name': 'Marathi'}, {'id': 'may', 'name': 'Malais'}, {'id': 'mlt', 'name': 'Maltais'}, {'id': 'bir', 'name': 'Birman'}, {'id': 'nau', 'name': 'Nauruan'}, {'id': 'nob', 'name': 'Norvégien bokmål'}, {'id': 'nde', 'name': 'Sindebele'}, {'id': 'nep', 'name': 'Népalais'}, {'id': 'ndo', 'name': 'Ndonga'}, {'id': 'nld', 'name': 'Néerlandais'}, {'id': 'nno', 'name': 'Norvégien nynorsk'}, {'id': 'nor', 'name': 'Norvégien'}, {'id': 'nbl', 'name': 'Nrebele'}, {'id': 'nav', 'name': 'Navajo'}, {'id': 'nya', 'name': 'Chichewa'}, {'id': 'oci', 'name': 'Occitan'}, {'id': 'oji', 'name': 'Ojibwé'}, {'id': 'orm', 'name': 'Oromo'}, {'id': 'ori', 'name': 'Oriya'}, {'id': 'oss', 'name': 'Ossète'}, {'id': 'pan', 'name': 'Pendjabi'}, {'id': 'pli', 'name': 'Pali'}, {'id': 'pol', 'name': 'Polonais'}, {'id': 'pus', 'name': 'Pachto'}, {'id': 'que', 'name': 'Quechua'}, {'id': 'roh', 'name': 'Romanche'}, {'id': 'run', 'name': 'Kirundi'}, {'id': 'rum', 'name': 'Roumain'}, {'id': 'kin', 'name': 'Kinyarwanda'}, {'id': 'san', 'name': 'Sanskrit'}, {'id': 'srd', 'name': 'Sarde'}, {'id': 'snd', 'name': 'Sindhi'}, {'id': 'sme', 'name': 'Same du Nord'}, {'id': 'sag', 'name': 'Sango'}, {'id': 'sin', 'name': 'Cingalais'}, {'id': 'slo', 'name': 'Slovaque'}, {'id': 'slv', 'name': 'Slovène'}, {'id': 'smo', 'name': 'Samoan'}, {'id': 'sna', 'name': 'Shona'}, {'id': 'som', 'name': 'Somali'}, {'id': 'alb', 'name': 'Albanais'}, {'id': 'ser', 'name': 'Serbe'}, {'id': 'ssw', 'name': 'Swati'}, {'id': 'sot', 'name': 'Sotho du Sud'}, {'id': 'sun', 'name': 'Soundanais'}, {'id': 'swe', 'name': 'Suédois'}, {'id': 'swa', 'name': 'Swahili'}, {'id': 'tam', 'name': 'Tamoul'}, {'id': 'tel', 'name': 'Télougou'}, {'id': 'tgk', 'name': 'Tadjik'}, {'id': 'tha', 'name': 'Thaï'}, {'id': 'tir', 'name': 'Tigrigna'}, {'id': 'tuk', 'name': 'Turkmène'}, {'id': 'tgl', 'name': 'Tagalog'}, {'id': 'tsn', 'name': 'Tswana'}, {'id': 'ton', 'name': 'Tongien'}, {'id': 'tso', 'name': 'Tsonga'}, {'id': 'tat', 'name': 'Tatar'}, {'id': 'twi', 'name': 'Twi'}, {'id': 'tah', 'name': 'Tahitien'}, {'id': 'uig', 'name': 'Ouïghour'}, {'id': 'ukr', 'name': 'Ukrainien'}, {'id': 'urd', 'name': 'Ourdou'}, {'id': 'uzb', 'name': 'Ouzbek'}, {'id': 'ven', 'name': 'Venda'}, {'id': 'vie', 'name': 'Vietnamien'}, {'id': 'vol', 'name': 'Volapük'}, {'id': 'wln', 'name': 'Wallon'}, {'id': 'wol', 'name': 'Wolof'}, {'id': 'xho', 'name': 'Xhosa'}, {'id': 'yid', 'name': 'Yiddish'}, {'id': 'yor', 'name': 'Yoruba'}, {'id': 'zha', 'name': 'Zhuang'},  {'id': 'zul', 'name': 'Zoulou'}];
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

  matchs(filterData: any = null, startDate: String, endDate: String): Promise<any> {
    return this.http.get(environment.serverUrl + '/api/matchs/admin?startDate=' + startDate + '&endDate' + endDate + this.getParams(filterData))
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

  quizResponses(filterData: any = null, page: number, limit: number): Promise<any> {
    return this.http.get(environment.serverUrl
      + `/api/quiz/response?skip=${(page - 1) * limit}&limit=${limit}`
      + this.getParams(filterData))
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
