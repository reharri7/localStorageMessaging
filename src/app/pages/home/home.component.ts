import {Component, computed, effect, signal} from '@angular/core';
import {toSignal} from "@angular/core/rxjs-interop";
import {fromEvent} from "rxjs";
import {Message} from "../../models/message";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  #messages = signal(JSON.parse(localStorage.getItem('messages')!) || []);
  synchronizedMessagesEffect = effect(() => {
    localStorage.setItem('messages', JSON.stringify(this.#messages()));
  });

  messages = this.#messages.asReadonly();

  constructor() {
    effect(() => {
      console.log(this.messages());
    });
  }

  addMessage() {
    const message: Message = {
      id: 0,
      text: "This is a message",
      timestamp: new Date().toISOString(),
      userId: 0
    };
    this.#messages.update((prev) => [...prev, message]);
  }

}
