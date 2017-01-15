import { Component } from '@angular/core';
import { Message } from './messages/message.model';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})

export class AppComponent {
    messages: Message[] = [
        new Message('Some Message', 'Bob'),
        new Message('Patriots Suck', 'Rob')
    ];

    editClicked(message: Message, event: string) {
        message.content = event;
    }
}
