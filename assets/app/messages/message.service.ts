import { Message } from './message.model';
import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';

import { ErrorService } from '../errors/error.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessageService {
    private messages: Message[] = [];
    private messageUrl = 'http://localhost:3000/api/messages';
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http, private errorService: ErrorService) { }

    private extractData(res: Response, isNew?: Boolean) {
        const body = res.json();
        const message = new Message(body.content, body.user.firstName, body._id, body.user._id);

        if (isNew) {
            this.messages.push(message);
        }

        return body || {};
    }

    private handleError(error: Response | any) {
        console.log(error.json());
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
    }

    private extractArrayData(res: Response) {
        const messages = res.json();
        let transformedMessages: Message[] = [];
        for (let message of messages) {
            transformedMessages.push(new Message(message.content, message.user.firstName, message._id, message.user._id));
        }
        this.messages = transformedMessages;
        return transformedMessages;
    }

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post(`${this.messageUrl}${token}`, body, { headers: headers })
            .map((res: Response) => this.extractData(res, true))
            .catch((res: Response) => this.handleError(res));
    }

    getMessages() {
        return this.http.get(this.messageUrl)
            .map((res: Response) => this.extractArrayData(res))
            .catch((res: Response) => this.handleError(res))
    }

    editMesssage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.patch(`${this.messageUrl}/${message.messageId}${token}`, body, { headers: headers })
            .map((res: Response) => this.extractData(res))
            .catch((res: Response) => this.handleError(res));
    }

    deleteMessage(message: Message) {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        this.messages.splice(this.messages.indexOf(message), 1);
        return this.http.delete(`${this.messageUrl}/${message.messageId}${token}`)
            .map((res: Response) => console.log(res))
            .catch((res: Response) => this.handleError(res));
    }
}
