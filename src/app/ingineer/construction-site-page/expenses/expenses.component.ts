import { Component, OnInit, Input } from '@angular/core';

import { ConstructionSite } from '../../../models/construction-site.model';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  @Input() constructionSite: ConstructionSite 

  

  constructor() { }

  ngOnInit() {

  }

}
