import { Component, Input, OnInit } from '@angular/core';
import { Message } from './models/message';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input()
  message: Message;

  constructor() { }

  ngOnInit(): void {
  }

}
