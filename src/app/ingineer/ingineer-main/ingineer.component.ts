import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

/*** Services ***/
import { ConstructionSiteService } from '../../services/construction-sites.service'

@Component({
  selector: 'app-ingineer',
  templateUrl: './ingineer.component.html',
  styleUrls: ['./ingineer.component.css']
})
export class IngineerComponent implements OnInit, OnDestroy  {
  CREATOR
  private CREATOR_SUB: Subscription

  public ingineer = {
    cash: 'unknown',
    nonCashUnpaid: 'unknown',
    documentsDebts: 'unknown'
  }

  constructor(private router: Router, 
              private route: ActivatedRoute, 
              public constructionSiteService: ConstructionSiteService,       
    ) {}

  onAddNewObj() {
    this.router.navigate(['new-object'], {relativeTo: this.route})
  }



  ngOnInit() {
    this.CREATOR = this.constructionSiteService.getCredentialsOfCreator();
    this.CREATOR_SUB = this.constructionSiteService.getCredentialsOfCreatorUpdateListener().subscribe(creator => {
     this.CREATOR = creator
   
    })
  }
  ngOnDestroy() {
    this.CREATOR_SUB.unsubscribe()
  }
}



