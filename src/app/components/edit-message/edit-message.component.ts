import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatError, MatFormField} from "@angular/material/form-field";
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
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './edit-message.component.html',
  styleUrl: './edit-message.component.css'
})
export class EditMessageComponent {
  text = new FormControl<string>('', [Validators.required, Validators.minLength(1)]);

  constructor(
    public dialogRef: MatDialogRef<EditMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.text.setValue(this.data?.originalText);
  }

  editMessage() {
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
