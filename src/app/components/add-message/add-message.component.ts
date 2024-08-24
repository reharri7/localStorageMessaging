import {Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
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

}
