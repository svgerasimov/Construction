import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-ingineer',
  templateUrl: './ingineer.component.html',
  styleUrls: ['./ingineer.component.css']
})
export class IngineerComponent  {

  public ingineer = {
    name: 'Астахов В.Г',
    cash: 80458,
    nonCashUnpaid: 159548,
    documentsDebts: 'Не имеются'
  }

  constructor(private router: Router, 
              private route: ActivatedRoute,        
    ) {}

  onAddNewObj() {
    this.router.navigate(['new-object'], {relativeTo: this.route})
  }
}



