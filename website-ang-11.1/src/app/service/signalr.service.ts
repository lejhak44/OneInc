import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnectionBuilder!: signalR.HubConnection | undefined;

  onStart = new EventEmitter();
  onClosed = new EventEmitter<any>();
  onSendResultToUser = new EventEmitter<any>();

  private _isBuild: boolean = false;

  constructor() 
  {

  }

  public async start()
  {    
    this.stop().then(async () => {

      this.hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl(`${ConfigService.API_URL}/messaging`)
      .configureLogging(LogLevel.Information)
      .build();
  
      this.hubConnectionBuilder.onclose(async (result: any) => {
  
        if (this.hubConnectionBuilder) 
        {
          await this.hubConnectionBuilder.stop();
          this.hubConnectionBuilder.off("messaging");
          this.hubConnectionBuilder = undefined; 
        }
        this.onClosed.emit(result);
      });
  
      this.hubConnectionBuilder.on('SendResultToUser', (result: any) => {
    
        this.onSendResultToUser.emit(result);
      });
  
      await this.hubConnectionBuilder
        .start()
        .then(() => {
  
          this.onStart.emit();
        })
        .catch(err => {
  
          this.stop();
        });
    });

  }
  public async stop()
  {
    if (this.hubConnectionBuilder) 
    {

      await this.hubConnectionBuilder.stop();
      if(this.hubConnectionBuilder) this.hubConnectionBuilder.off("messaging");
      this.hubConnectionBuilder = undefined; 
    }
  }
}
