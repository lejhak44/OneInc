import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  public static API_URL: string = "";

  constructor(private http: HttpClient) { }
  
  loadConfig(): Promise<any> {
    const promise = this.http
      .get('/assets/app.config.json?q=' + new Date().getTime())
      .toPromise()
      .then((data: any) => {
        ConfigService.API_URL = data.apiUrl;
        return data;
      });
    return promise;
  }
}
