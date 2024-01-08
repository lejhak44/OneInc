import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StringCipherService 
{
  constructor(private http: HttpClient) {
    
  }

  public SendConvertToBase64(text: string): Observable<any> {

    const data = { 'text': text };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const params = new URLSearchParams(data).toString();

    return this.http.post<any>(`${ConfigService.API_URL}/api/StringCipher/ConvertToBase64?${params}`, data, { headers });
  }
}
