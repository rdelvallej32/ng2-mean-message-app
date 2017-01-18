import { Message } from './message.model';
import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessageService {
    private messages: Message[] = [];
    private messageUrl = 'http://localhost:3000/api/messages';
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http) { }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;

        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private extractArrayData(res: Response) {
        const messages = res.json();
        let transformedMessages: Message[] = [];
        for (let message of messages) {
            transformedMessages.push(new Message(message.content, 'DummyData', message._id, null));
        }
        this.messages = transformedMessages;
        return transformedMessages;
    }

    addMessage(message: Message) {
        this.messages.push(message);
        const body = JSON.stringify(message);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.messageUrl, body, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getMessages() {
        return this.http.get(this.messageUrl)
            .map(this.extractArrayData)
            .catch(this.handleError)
    }

    editMesssage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {

    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}
