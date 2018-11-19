import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ConstructionSite } from '../../../models/construction-site.model'

import { DateAdapter } from "@angular/material"
import { CustomDateAdapter } from '../../add-construction-site/date.adapter'
import * as moment from 'moment';

@Component({
  selector: 'app-deadlines',
  templateUrl: './deadlines.component.html',
  styleUrls: ['./deadlines.component.css'],
  providers: [

    {
       provide: DateAdapter, useClass: CustomDateAdapter
   } 

]
})
export class DeadlinesComponent implements OnInit {

  isEmpty(){
    for(var prop in this) {
      if(this.hasOwnProperty(prop))
          return false;
  }
  return true;
  }

 

  isPropExists


  @Input() constructionSite: ConstructionSite
  @Output() currentDeadlinesAdded = new EventEmitter<{
                                                    actualDateOfSigningContract: Date,
                                                    actualDateOfStartingWork: Date,
                                                    planningDateOfCompletionOfWorks: Date,
                                                    planningDateOfPaymentContract: Date
                                                  }>()


  actualDateOfSigningContract: Date
  actualDateOfStartingWork: Date
 
  get planningDateOfCompletionOfWorks(){
    if(!!this.constructionSite && !!this.constructionSite.deadlines){
      let result = new Date(this.actualDateOfStartingWork)
      result.setDate(+result.getDate() + +this.constructionSite.deadlines.timeLimitForWork);
      return result; 
    }
  }

  get planningDateOfPaymentContract(){
    if(!!this.constructionSite && !!this.constructionSite.deadlines){
      let result = new Date(this.actualDateOfSigningContract);
      result.setDate(+result.getDate() + +this.constructionSite.deadlines.timeLimitForPaymentContract);
      return result; 
    }
  } 

/*   (ngModelChange)="saveDate()"  */

   saveDate(){
    setTimeout(() => {
       this.currentDeadlinesAdded.emit({
        actualDateOfSigningContract: this.actualDateOfSigningContract,
        actualDateOfStartingWork: this.actualDateOfStartingWork,
        planningDateOfCompletionOfWorks: this.planningDateOfCompletionOfWorks,                                               
        planningDateOfPaymentContract: this.planningDateOfPaymentContract                                                                                           
      }); 
    }, 200)
    
  } 


  constructor() { }

  ngOnInit() {}

  isDate(d){
    if (Object.prototype.toString.call(d) === "[object Date]") {
      if (isNaN(d.getTime())) {  
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }


  

}
