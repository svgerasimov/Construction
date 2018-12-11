import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material'; 
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

/** Interfaces **/
import { ConstructionSite } from '../../../models/construction-site.model';

/*** Services ***/
import { ConstructionSiteService } from '../../../services/construction-sites.service'


@Component({
  selector: 'app-current-construction-sites',
  templateUrl: './current-construction-sites.component.html',
  styleUrls: ['./current-construction-sites.component.css']
})


export class CurrentConstructionSitesComponent implements OnInit, OnDestroy {
  CURRENT_CONSTRUCTION_SITES_DATA
  private CURRENT_CONSTRUCTION_SITES_DATA_SUB: Subscription;


  constructor(
    public constructionSiteService: ConstructionSiteService,
    private router: Router,
    private route: ActivatedRoute
    ) {}


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    
   setTimeout(()=> {
    this.CURRENT_CONSTRUCTION_SITES_DATA = this.constructionSiteService.getConstructionSites();
   
    this.CURRENT_CONSTRUCTION_SITES_DATA_SUB = this.constructionSiteService.getConstructionSiteUpdateListener().subscribe((constructionSites) => {
        this.CURRENT_CONSTRUCTION_SITES_DATA = constructionSites;
        this.dataSource = new MatTableDataSource<ConstructionSite>(this.CURRENT_CONSTRUCTION_SITES_DATA);

   });
   
  }, 300)

  }

   ngOnDestroy() {
    this.CURRENT_CONSTRUCTION_SITES_DATA_SUB.unsubscribe()
  }
  
  onShowConstructionSitePage(constructionSite){

    this.router.navigate(['object'], {relativeTo: this.route})
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['nameOfConstructionSite', 'customer', 'deadline', 'valueOfContract', 'planningExpenditures'];
 
  dataSource = new MatTableDataSource<ConstructionSite>(this.CURRENT_CONSTRUCTION_SITES_DATA);
  
}


