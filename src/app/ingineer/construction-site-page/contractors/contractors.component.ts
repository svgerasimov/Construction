import { Component, OnInit, Inject, Input, OnDestroy, ViewChild} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from "@angular/material";
import { Subscription } from 'rxjs';
import { AddNewContractorDialogComponent } from './add-new-contractor-dialog/add-new-contractor-dialog.component'

/*** Interfaces ***/
import { Contractor } from "../../../models/contractor.model"

/*** Services ***/
import { ConstructionSiteService } from '../../../services/construction-sites.service';

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css']
})
export class ContractorsComponent implements OnInit, OnDestroy {
  scans: Object[] = [];

  name: string;
  secondName: string;
  patronymic: string;
  phone: number;
  typeOfWork: string;

  @Input() _id:string
  constructionSiteIndex: number

  private constructionSites
  private constructionSites_sub: Subscription

  contractors = new MatTableDataSource<Contractor>(this.constructionSites);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    public constructionSiteService: ConstructionSiteService,
  ) {}

  ngOnInit() {
      this.contractors.paginator = this.paginator;

      this.constructionSites = this.constructionSiteService.getConstructionSites()
      this.constructionSites_sub = this.constructionSiteService.getConstructionSiteUpdateListener().subscribe((constructionSites) => {
      this.constructionSites = constructionSites

      this.contractors = new MatTableDataSource<Contractor>(this.constructionSites.find(s => s._id === this._id).contractors);

    
      })
    }

  ngOnDestroy() {
    this.constructionSites_sub.unsubscribe()
   }

   

   displayedColumns: string[] = [
    'name', 
    'secondName', 
    'patronymic', 
    'typeOfWork', 
    'phone', 
    'scanOfPassport', 
    'scanOfPatent',
    'scanOfContractA',
    'scanOfContractB',
    'scanOfContractC',

  ];



  addNewContractorDialogRef: MatDialogRef<AddNewContractorDialogComponent>

  openAddNewContractorDialog(contractor?){

     const addNewContractorDialogRef = this.dialog.open(AddNewContractorDialogComponent, {
       width: '600px'
     })

     addNewContractorDialogRef.afterClosed().subscribe((newContractor) => {
         
          for (let prop in newContractor) {
            if (newContractor[prop] instanceof File) {
              this.scans.push(newContractor[prop])
            }
          }
    
          const contractor = (({ name, secondName, patronymic, phone, typeOfWork }) => ({ name, secondName, patronymic, phone, typeOfWork  }))(newContractor);
          contractor['docsFiles'] = this.scans
        
          this.constructionSiteService.addContractor(this._id, contractor)

          
      
       }
     )
  }
}

