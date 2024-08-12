import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-add-message',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogClose,
    MatButton
  ],
  templateUrl: './add-message.component.html',
  styleUrl: './add-message.component.css'
})
export class AddMessageComponent {
  text = new FormControl<string>('');
  @Output() newMessageEvent = new EventEmitter<string>();


  constructor(
    public dialogRef: MatDialogRef<AddMessageComponent>,
  ) {
  }

  addNewMessage() {
    if (!!this.text.value) {
      this.dialogRef.close({
        data: {
          text: this.text.value
        }
      });
    }
  }
}
