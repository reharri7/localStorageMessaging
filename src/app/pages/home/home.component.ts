import {Component, computed, effect, HostListener, signal} from '@angular/core';
import {Message} from "../../models/message";
import {v4 as uuidv4} from 'uuid';

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



  @HostListener('window:storage')
  localStorageEventListener() {
    console.log('storage');
    this.#messages.update((prev) => JSON.parse(localStorage.getItem('messages')!) || []);
  }

  messages = computed(() => {
    return this.#messages();
  });

  addMessage() {
    const message: Message = {
      id: uuidv4(),
      text: "This is a message",
      timestamp: new Date().toISOString(),
      userId: uuidv4()
    };
    this.#messages.update((prev) => [...prev, message]);
  }

  editMessage(id: string) {
    const messageIndex = this.#messages().findIndex((message: Message) => message.id === id);
    if (messageIndex !== -1) {
      const updatedMessage: Message = {
        ...this.#messages()[messageIndex],
        text: "Updated message"
      };
      this.#messages.update((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[messageIndex] = updatedMessage;
        return updatedMessages;
      });
    }
  }

  deleteMessage(id: string) {
    this.#messages.update((prev) => prev.filter((message: Message) => message.id !== id));
  }

  clearMessages() {
    this.#messages.update(() => []);
  }
}
