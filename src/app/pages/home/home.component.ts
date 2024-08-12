import {Component, computed, effect, HostListener, signal} from '@angular/core';
import {Message} from "../../models/message";
import {v4 as uuidv4} from 'uuid';
import {MatDialog} from "@angular/material/dialog";
import {AddMessageComponent} from "../../components/add-message/add-message.component";

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


  constructor(
    private dialog: MatDialog,
  ) {
  }

  addMessage() {
    const dialogRef = this.dialog.open(AddMessageComponent, {
      maxHeight: '90vh',
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(async result => {
      if(result.data?.text && result.data.text != '') {
        const data = result.data;
        const message: Message = {
          id: uuidv4(),
          text: data.text,
          timestamp: new Date().toISOString(),
          userId: uuidv4()
        };
        this.#messages.update((prev) => [...prev, message]);
      }
    });

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
