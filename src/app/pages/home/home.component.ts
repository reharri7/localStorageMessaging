import {Component, computed, effect, HostListener, OnInit, signal} from '@angular/core';
import {Message} from "../../models/message";
import {v4 as uuidv4} from 'uuid';
import {MatDialog} from "@angular/material/dialog";
import {AddMessageComponent} from "../../components/add-message/add-message.component";
import {User} from "../../models/user";
import {AddUserComponent} from "../../components/add-user/add-user.component";
import {EditMessageComponent} from "../../components/edit-message/edit-message.component";
import {EditUserComponent} from "../../components/edit-user/edit-user.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  #messages = signal(JSON.parse(localStorage.getItem('messages')!) || []);
  #users = signal(JSON.parse(localStorage.getItem('users')!) || []);
  isLoading = false;
  synchronizedMessagesEffect = effect(() => {
    localStorage.setItem('messages', JSON.stringify(this.#messages()));
  });
  synchronizedUsersEffect = effect(() => {
    localStorage.setItem('users', JSON.stringify(this.#users()));
  });
  messages = computed(() => {
    return this.#messages();
  });
  protected userId = '';
  users = computed(() => {
    return this.#users();
  });

  @HostListener('window:storage')
  localStorageEventListener(e: StorageEvent): void {
    this.#messages.update((prev) => JSON.parse(localStorage.getItem('messages')!) || []);
    this.#users.update((prev) => JSON.parse(localStorage.getItem('users')!) || []);
    window.scrollTo(0, document.body.scrollHeight);
  }


  @HostListener('window:beforeunload')
  beforeUnloadEventListener() {
    this.softDeleteUser();
  }

  constructor(
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.addUser();
    this.isLoading = false;
    // window.scrollTo(0, document.body.scrollHeight);
  }

  addMessage() {
    if (!!this.userId) {
      const dialogRef = this.dialog.open(AddMessageComponent, {
        maxHeight: '90vh',
        width: '900px'
      });

      dialogRef.afterClosed().subscribe(async result => {
        if (result.data?.text && result.data.text != '') {
          const data = result.data;
          const message: Message = {
            id: uuidv4(),
            text: data.text,
            timestamp: new Date().toISOString(),
            userId: this.userId,
          };
          this.#messages.update((prev) => [...prev, message]);
          window.scrollTo(0, document.body.scrollHeight);
        }
      });
    }
  }

  addUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      maxHeight: '90vh',
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result.data?.displayName) {
        const data = result.data;
        const user: User = {
          displayName: data.displayName,
          id: uuidv4()
        }
        this.userId = user.id;
        this.#users.update((prev) => [...prev, user]);
      }
    });
  }

  editUser() {
    let userToUpdate = this.#users().find((user: User) => user.id === this.userId);
    if (userToUpdate) {
      const dialogRef = this.dialog.open(EditUserComponent, {
        maxHeight: '90vh',
        width: '900px',
        data: {
          displayName: userToUpdate.displayName,
        }
      });

      dialogRef.afterClosed().subscribe(async result => {
        if (result.data?.displayName) {
          const data = result.data;
          if (!!userToUpdate) {
            userToUpdate = {
              ...userToUpdate,
              displayName: data.displayName,
            };
            this.#users.update((prev) => [...prev.filter((user: User) => user.id !== this.userId), userToUpdate]);
            this.userId = userToUpdate.id;
          }
        }
      });
    }
  }

  softDeleteUser() {
    let userToUpdate = this.#users().find((user: User) => user.id === this.userId);
    if (!!userToUpdate) {
      userToUpdate = {
        ...userToUpdate,
        displayName: "Ghost User",
      };
      this.#users.update((prev) => [...prev.filter((user: User) => user.id !== this.userId), userToUpdate]);
    }
  }

  editMessage(id: string) {
    const messageIndex = this.#messages().findIndex((message: Message) => message.id === id);
    if (messageIndex !== -1) {
      const message = this.#messages().at(messageIndex);
      if (message.userId === this.userId) {
        const dialogRef = this.dialog.open(EditMessageComponent, {
          maxHeight: '90vh',
          width: '900px',
          data: {
            originalText: message.text,
          }
        });
        dialogRef.afterClosed().subscribe(async result => {
          if (result.data?.text) {
            const data = result.data;
            const updatedMessage: Message = {
              ...message,
              text: data.text,
            }
            this.#messages.update((prev) => {
              const updatedMessages = [...prev];
              updatedMessages[messageIndex] = updatedMessage;
              return updatedMessages;
            });
          }
        });
      }
    }
  }

  deleteMessage(id: string) {
    const messageIndex = this.#messages().findIndex((message: Message) => message.id === id);
    if (messageIndex !== -1) {
      const message = this.#messages().at(messageIndex);
      if (message.userId === this.userId) {
        this.#messages.update((prev) => prev.filter((message: Message) => message.id !== id));
      }
    }
  }

  clearMessages() {
    this.#messages.update(() => []);
  }

  getUser(userId: string): User | null {
    const user = this.#users().find((user: User) => user.id === userId);
    if (!!user) {
      return user;
    }
    return null;
  }
}
