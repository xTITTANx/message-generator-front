import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { Message } from "../components/message/models/message";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";

@Injectable()
export class MessageService {
  private messageHub: HubConnection;

  onMessageReceived = new EventEmitter<Notification>();

  constructor(private http: HttpClient) {
  }

  public init() {
    this.startConnection();
  }

  private startConnection() {
    this.messageHub = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/hubs/messages")
      .build();

    this.messageHub.on("messageSent", message => {
      this.onMessageReceived.emit(message);
    });

    this.messageHub.start();
  }

  public GetList() : Observable<Message[]> {
    return this.http.get<Message[]>('http://localhost:5000/api/message');
  }

  stopConnection() {
    if (this.messageHub)
      this.messageHub.stop();
  }
}
