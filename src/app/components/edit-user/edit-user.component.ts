import {Component, Inject} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-edit-user',
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
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  displayName = new FormControl<string>('', [Validators.required, Validators.minLength(3)]);

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(this.data);
    this.displayName.setValue(this.data?.displayName);
  }

  editUser() {
    this.displayName.markAsTouched();
    if (this.displayName.valid && !!this.displayName.value) {
      this.dialogRef.close({
        data: {
          displayName: this.displayName.value
        }
      });
    }
  }
}
