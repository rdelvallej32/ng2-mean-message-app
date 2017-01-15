import { Component } from '@angular/core';
import { Message } from './message.model';

@Component({
    selector: 'app-message-list',
    template: `
    <div class="col-md-8 col-md-offset-2">
      <app-message *ngFor="let message of messages"
        [message]="message"
        (editClicked)="editClicked(message, $event)">
      </app-message>
    </div>
  `
})

export class MessageListComponent {
    messages: Message[] = [
        new Message('Some Message', 'Bob'),
        new Message('Patriots Suck', 'Rob')
    ];

    editClicked(message: Message, event: string) {
        message.content = event;
    }

}
