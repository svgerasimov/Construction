import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router} from '@angular/router';

/** Interfaces **/
import { Contractor } from "../../models/contractor.model"
import { ConstructionSite } from '../../models/construction-site.model';

/*** Services ***/
import { ConstructionSiteService } from '../../services/construction-sites.service'
import { ContactPerson } from 'src/app/models/contact-person.model';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit, OnDestroy {
  isEmpty(obj) {
    for(var key in obj) {
        if(this.hasOwnProperty(key))
            return false;
    }
    return true;
  }
  CURRENT_CONSTRUCTION_SITE: ConstructionSite = new Object() 
  
  private CURRENT_CONSTRUCTION_SITE_SUB: Subscription;
  
  constructor(
    public constructionSiteService: ConstructionSiteService,
    private router: Router
    ) {}


  ngOnInit() {
    this.CURRENT_CONSTRUCTION_SITE = this.constructionSiteService.getSelectedConstructionSite();

    this.CURRENT_CONSTRUCTION_SITE_SUB = this.constructionSiteService.getSelectedConstructionSiteUpdateListener().subscribe((constructionSite: ConstructionSite) => {
    this.CURRENT_CONSTRUCTION_SITE = constructionSite;
   });

   this.contractors = this.CURRENT_CONSTRUCTION_SITE.contractors
   this.contactPersons = this.CURRENT_CONSTRUCTION_SITE.contactPersons
  }


  ngOnDestroy() {
    this.CURRENT_CONSTRUCTION_SITE_SUB.unsubscribe()
  }

  contractors: Contractor[] = this.CURRENT_CONSTRUCTION_SITE.contractors
  contactPersons: ContactPerson[] = this.CURRENT_CONSTRUCTION_SITE.contactPersons
}

