import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Subscription } from 'rxjs';

/*** Interfaces ***/
import { Contractor } from "../../../models/contractor.model"

/*** Services ***/
import { ContractorService } from '../../../services/contractors.service'

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css']
})
export class ContractorsComponent implements OnInit, OnDestroy {
    counterId: number = 1;

    isForemanAssigned: boolean = false;


    isForeman?: boolean;
    name: string;
    secondName: string;
    patronymic: string;
    phone: number;
    typeOfWork: string;

    displayedColumns: string[] = [
      'name', 
      'secondName', 
      'patronymic', 
      'typeOfWork', 
      'phone', 
      'scanOfPassport', 
      'scanOfPatent',
      'scanOfContractB',
      'scanOfContractA',
      'scanOfContractC' 
    ];

  contractors: Contractor[] = []
  private contractors_sub: Subscription;

  constructor(
    private dialog: MatDialog,
    public contractorService: ContractorService,
  ) {}

  ngOnInit() {
    this.contractors = this.contractorService.getContractors();

    this.contractors_sub = this.contractorService.getContractorsUpdateListener().subscribe((contractors: Contractor[]) => {
      this.contractors = contractors;
   });
  }

  ngOnDestroy() {
    this.contractors_sub.unsubscribe()
  }

  openDialog(){
    const dialogRef = this.dialog.open(AddNewContractor, {
      width: '450px',
      data: {
        name: this.name, 
        secondName: this.secondName,
        patronymic: this.patronymic,
        phone: this.phone,
        typeOfWork: this.typeOfWork
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.name && result.secondName){
        result.id = this.counterId;
        result.isForeman = false;
        this.contractorService.addContractor(result)
        this.counterId += 1 
        console.log(this.contractors)
      }

    });   
  }

  onMakeContractorForeman(contractor){
    this.contractorService.makeContractorForeman(contractor)
    this.isForemanAssigned = true
  }

}


@Component({
  selector: 'add-new-contractor',
  templateUrl: 'add-new-contractor.html',
})

export class AddNewContractor {

  constructor(
    public dialogRef: MatDialogRef<AddNewContractor>,
    @Inject(MAT_DIALOG_DATA) public contractor: Contractor) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
