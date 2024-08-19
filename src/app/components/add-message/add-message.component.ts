import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatError, MatFormField} from "@angular/material/form-field";
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
    MatButton,
    MatError
  ],
  templateUrl: './add-message.component.html',
  styleUrl: './add-message.component.css'
})
export class AddMessageComponent {
  text = new FormControl<string>('', [Validators.required, Validators.minLength(1)]);

  constructor(
    public dialogRef: MatDialogRef<AddMessageComponent>,
  ) {
  }

  addNewMessage() {
    this.text.markAsTouched();
    if (this.text.valid && !!this.text.value) {
      this.dialogRef.close({
        data: {
          text: this.text.value
        }
      });
    }
  }
}
