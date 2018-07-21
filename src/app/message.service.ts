import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Injectable({
    providedIn: 'root',
})
export class MessageService {
  private connection: signalR.HubConnection;

  connect() {
    if (!this.connection) {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5000/chathub", { accessTokenFactory: () => "" })
        .build();
        
      this.connection.on("receive", (user, msg) => {
        console.log('do something')
      });
      
      this.connection.start().catch(err => console.error(err));
    }
  }
  
  send(message) {
    this.connection.invoke("SendMessage", message).catch(err => console.error(err));
  }

  disconnect() {
    if (this.connection) {
      this.connection.stop();
      this.connection = null;
    }
  }
}