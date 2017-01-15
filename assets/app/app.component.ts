import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
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
export class AppComponent {
    content = 'hi';
    message = {
        content: 'Practicing some angular2, ahoy!',
        author: 'Bob'
    };
}
