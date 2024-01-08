import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignalrService } from './service/signalr.service';
import { ConfigService } from './service/config.service';
import { StringCipherService } from './service/string-cipher.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {

  title = 'OneIncTest';
  offers: any[] = [];
  totalConvertedString: string = "";
  forConvertionText: string = "";

  isLoading: boolean = false;

  constructor(private http: HttpClient, public config: ConfigService, public signalrService: SignalrService, public stringCipherSrv : StringCipherService) {

  }

  async ngOnInit(): Promise<void> {
    await this.config.loadConfig();

    this.signalrService.onStart.subscribe(() => {
     
      var textToConvert = this.forConvertionText;

      this.isLoading = true;

      this.stringCipherSrv.SendConvertToBase64(textToConvert).subscribe(
        response => {

          this.isLoading = false;
        },
        error => {
  
          this.isLoading = false;
        }
      );

    });

    this.signalrService.onSendResultToUser.subscribe((result:any) => {
      
      this.totalConvertedString += result;
    });
    
    this.signalrService.onClosed.subscribe(() => {
      
      this.isLoading = false;
    });

  }
  async BtnConvert_OnCLick() 
  {

    this.reset();
    this.signalrService.start();
  }

  BtnCancel_OnCLick() 
  {

    this.signalrService.stop();
  }

  public reset()
  {
    this.totalConvertedString = "";
  }
}
