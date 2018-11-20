import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ParamMap} from '@angular/router';
import { ActivatedRoute } from '@angular/router'

/** Interfaces **/

import { ConstructionSite } from '../../models/construction-site.model';
import { Contractor } from '../../models/contractor.model';

/*** Services ***/
import { ConstructionSiteService } from '../../services/construction-sites.service'
//import { ContractorService } from '../../services/contractors.service'


@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})


export class ObjectComponent implements OnInit {
  private constSiteId: string;
  public constructionSite: ConstructionSite;



  isEmpty(obj) {
    for(var key in obj) {
        if(this.hasOwnProperty(key))
            return false;
    }
    return true;
  }


  
  constructor(
    public constructionSiteService: ConstructionSiteService,
    //public contractorService: ContractorService,
    public route: ActivatedRoute,
    private router: Router
    ) {}


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('constSiteId')) {
        this.constSiteId = paramMap.get('constSiteId')
          this.constructionSiteService.getConstructionSite(this.constSiteId).subscribe(constructionSite => {
            this.constructionSite = constructionSite
        }) 
      }
    })


  }


  onCurrentDeadlinesAdded(currentDeadlines: { actualDateOfSigningContract: Date,
                                              actualDateOfStartingWork: Date,
                                              planningDateOfCompletionOfWorks: Date,
                                              planningDateOfPaymentContract: Date
                                            }){
                                         
                                           
        this.constructionSiteService.updateConstructionSiteCurrentDeadlines(this.constSiteId, currentDeadlines)
  }

   /*  onContractorsAdded(contractors: Contractor[]) {
      this.constructionSiteService.updateConstructionSiteContractors(this.constSiteId, contractors)
  }  */


}

