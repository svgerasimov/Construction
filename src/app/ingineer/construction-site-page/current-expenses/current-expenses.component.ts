import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-current-expenses',
  templateUrl: './current-expenses.component.html',
  styleUrls: ['./current-expenses.component.css']
})
export class CurrentExpensesComponent implements OnInit {
  @Input() _id: string

  constructor() { 
    
  }

  ngOnInit() {
  }

  

}

