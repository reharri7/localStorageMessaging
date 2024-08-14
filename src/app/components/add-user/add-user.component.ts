import {Component} from '@angular/core';
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
  selector: 'app-add-user',
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
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  displayName = new FormControl<string>('', [Validators.required, Validators.minLength(3)]);

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
  ) {
  }

  addNewUser() {
    if (!!this.displayName.value) {
      this.dialogRef.close({
        data: {
          displayName: this.displayName.value
        }
      });
    }
  }
}
