import { Component, OnInit} from '@angular/core';
import { MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomValidator } from '../../../../shared/validation';

@Component({
  selector: 'app-add-seller',
  templateUrl: './add-seller.component.html',
  styleUrls: ['./add-seller.component.css']
})
export class AddSellerComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddSellerComponent>,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      'name': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]}),
      'inn': new FormControl(null, {
        validators: [Validators.required, CustomValidator.numberValidator]}),
    
    }) 
  }

  submit(form) {
    this.dialogRef.close(form.value);
  }

}
