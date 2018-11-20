import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ConstructionSite } from '../../../models/construction-site.model';

import { Expenditure } from '../../../models/expenditure.model'
import { ItemsOfExpenditure } from '../../../models/item-of-expenditure.model'

import { Subscription } from 'rxjs';

/*** Services ***/
import { ConstructionSiteService } from '../../../services/construction-sites.service'

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit, OnDestroy {
  @Input() _id: any 
  constructionSites
  private constructionSites_sub: Subscription
  
  constructionSite: any

  dutyExpenditures: any = []
  itemsOfExpenditures: ItemsOfExpenditure = {}
  materialCosts: any = 0
  otherCosts: any = 0
  petrolOilLubricantsCosts: any = 0
  sumOfExpenses: number = 0

  sumOfAccountOfitemOfExpenditure (expenditures, itemOfExpenditure) {
    return expenditures.reduce((acc, cur) => {
        return acc + cur[itemOfExpenditure];
    }, 0);
};
  

  constructor(public constructionSiteService: ConstructionSiteService) { }

  ngOnInit() {

    setTimeout(()=>{
      this.constructionSites = this.constructionSiteService.getConstructionSites()
      this.constructionSites_sub = this.constructionSiteService.getConstructionSiteUpdateListener().subscribe(constructionSites => {
      this.constructionSites = constructionSites

      this.constructionSite = this.constructionSites.find(s => s._id === this._id);
      this.itemsOfExpenditures = this.constructionSites.find(s => s._id === this._id).itemsOfExpenditures;
      this.dutyExpenditures = this.constructionSites.find(s => s._id === this._id).dutyExpenditures;
      /* Material Costs */
      if(this.itemsOfExpenditures.materialCosts.length > 0) {
        this.materialCosts = this.sumOfAccountOfitemOfExpenditure(this.itemsOfExpenditures.materialCosts, 'sumOfAccount')

      }

      /* petrolOilLubricants Costs */
      if(this.itemsOfExpenditures.petrolOilLubricantsCosts.length > 0) {
        this.petrolOilLubricantsCosts = this.sumOfAccountOfitemOfExpenditure(this.itemsOfExpenditures.petrolOilLubricantsCosts, 'sumOfAccount')

      }

      /* other Costs */
      if(this.itemsOfExpenditures.otherCosts.length > 0) {
        this.otherCosts = this.sumOfAccountOfitemOfExpenditure(this.itemsOfExpenditures.otherCosts, 'sumOfAccount')
        }

        this.sumOfExpenses = this.otherCosts + this.petrolOilLubricantsCosts + this.materialCosts
    
      })

    }, 400)
  }


     


  ngOnDestroy(){
    this.constructionSites_sub.unsubscribe()
  }

}
