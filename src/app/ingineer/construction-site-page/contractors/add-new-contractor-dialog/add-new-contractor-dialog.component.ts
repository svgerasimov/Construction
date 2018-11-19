import { Component, OnInit} from '@angular/core';
import { MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-contractor-dialog',
  templateUrl: './add-new-contractor-dialog.component.html',
  styleUrls: ['./add-new-contractor-dialog.component.css']
})
export class AddNewContractorDialogComponent implements OnInit {
  passportPreview
  patentPreview
  contractAPreview
  contractBPreview
  contractCPreview

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddNewContractorDialogComponent>,
  ) { }

  ngOnInit() {
     this.form = this.formBuilder.group({
      'name': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]}),
      'secondName': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]}),
      'patronymic': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]}),
      'phone': new FormControl(null, {
        validators: [
          Validators.required, 
          Validators.pattern(/(\(?[0-9]{3}\)?-?\s?[0-9]{3}-?[0-9]{4})/)
        ]}),
      'typeOfWork': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]}),
      'passport': new FormControl(null, {
        validators: [Validators.required]
      }),
      'patent': new FormControl(null, {
        validators: [Validators.required]
      }),

      'contractA': new FormControl(null), 
      'contractB': new FormControl(null), 
      'contractC': new FormControl(null), 
    }) 
  }
  submit(form) {
    this.dialogRef.close(form.value);
  }

  onPassportLoaded(event: Event){
    let passport = (event.target as HTMLInputElement).files[0];

    this.form.patchValue({passport: passport});
    this.form.get('passport').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.passportPreview = reader.result
    }
    reader.readAsDataURL(passport)
  }

  onPatentLoaded(event: Event){
    const patent = (event.target as HTMLInputElement).files[0];


    this.form.patchValue({patent: patent});
    this.form.get('patent').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.patentPreview = reader.result
    }
    reader.readAsDataURL(patent)
  }

  onContractALoaded(event: Event){
    const contractA = (event.target as HTMLInputElement).files[0];


     this.form.patchValue({contractA: contractA});
    this.form.get('contractA').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.contractAPreview = reader.result
    }
    reader.readAsDataURL(contractA)
  }

  onContractBLoaded(event: Event){
    const contractB = (event.target as HTMLInputElement).files[0];


     this.form.patchValue({contractB: contractB});
    this.form.get('contractB').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.contractBPreview = reader.result
    }
    reader.readAsDataURL(contractB)
  }

  onContractCLoaded(event: Event){
    const contractC = (event.target as HTMLInputElement).files[0];

     this.form.patchValue({contractC: contractC});
    this.form.get('contractC').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.contractCPreview = reader.result
    }
    reader.readAsDataURL(contractC)
  }

}



