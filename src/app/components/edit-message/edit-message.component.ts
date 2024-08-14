import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-message',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './edit-message.component.html',
  styleUrl: './edit-message.component.css'
})
export class EditMessageComponent {
  @Input() originalText = '';
  text = new FormControl<string>(this.originalText, [Validators.required, Validators.minLength(1)]);

  constructor(
    public dialogRef: MatDialogRef<EditMessageComponent>,
  ) {
  }

  editMessage() {
    if (!!this.text.value) {
      this.dialogRef.close({
        data: {
          text: this.text.value
        }
      });
    }
  }
}
