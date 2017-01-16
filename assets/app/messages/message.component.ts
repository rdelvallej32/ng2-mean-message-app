import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service';

//note?
@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styles: [`
      .author {
        display: inline-block;
        font-style: italic;
        width: 80%;
        font-stize: 12px;
      }
      .config {
        display: inline-block;
        text-align: right;
        font-stize: 12px;
        width: 19%;
      }
      `]
})

export class MessageComponent {
    @Input() message: Message;
    @Output() editClicked = new EventEmitter<string>();

    constructor(private messageService: MessageService) { }

    color = 'yellow';

    onEdit() {
        this.editClicked.emit('A new value');
    }

    onDelete() {
        this.messageService.deleteMessage(this.message);
    }
}
