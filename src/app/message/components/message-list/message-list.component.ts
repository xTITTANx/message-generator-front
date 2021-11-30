import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../shared/message.service';
import { Message } from '../message/models/message';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  providers: [
    MessageService
  ]
})
export class MessageListComponent implements OnInit, OnDestroy {

  list: Message[] = [];

  constructor(private messageService: MessageService) {
  }

  messageSubsciption: Subscription;

  ngOnInit(): void {
    this.messageService.init();

    this.messageService.GetList().subscribe((data: Message[]) => this.list = data);

    this.messageSubsciption = this.messageService.onMessageReceived.subscribe((message: Message) => {
     this.list.push(message)
     });
  }

  ngOnDestroy(): void {
    this.messageService.stopConnection();
  }
}
