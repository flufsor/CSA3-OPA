import { Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent {
  message: string = '';

  postMessage() {
    // Voeg hier de logica toe om een bericht te plaatsen, bijvoorbeeld het opslaan van het bericht in een database.
  }
}
