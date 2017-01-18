import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from './message.service';
import { Message } from './message.model';

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})

export class MessageInputComponent implements OnInit {
    message: Message;

    constructor(private messageService: MessageService) { }

    ngOnInit() {
        this.messageService.messageIsEdit.subscribe(
            (message: Message) => this.message = message
        );
    }

    onClear(form: NgForm) {
        form.resetForm();
    }

    onSave(value: string) {
        const message = new Message(value, 'Rob');
        this.messageService.addMessage(message);
    }

    onSubmit(form: NgForm) {
        const message = new Message(form.value.content, 'Robby');
        this.messageService.addMessage(message)
            .subscribe(
            data => console.log(data),
            err => console.log(err)
            );
        console.log(form);
        // Cool function to just clean form after it was submitted!
        form.resetForm()
    }
}
