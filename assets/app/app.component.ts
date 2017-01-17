import { Component } from '@angular/core';
import { MessageService } from './messages/message.service';
import './shared/rxjs-operators';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [MessageService]
})

export class AppComponent {
}
