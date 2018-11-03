import { HttpClient } from "@angular/common/http"

/**** Interfaces ****/
import { ConstructionSite } from '../models/construction-site.model'

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class ConstructionSiteService {
    /* Строительные объекты */
   private constructionSites = [];
   private constructionSitesUpdated = new Subject();

   constructor(private http: HttpClient){

   }

   getConstructionSites() {
    this.http.get<{message: string, constructionSites: ConstructionSite[]}>('http://localhost:3000/api/construction-sites')
        .subscribe((constrSitesData) => {
            this.constructionSites = constrSitesData.constructionSites
            this.constructionSitesUpdated.next([...this.constructionSites])
        });   
    }
    getConstructionSiteUpdateListener() {
        return this.constructionSitesUpdated.asObservable();
    }

    addConstructionSite(constSite: ConstructionSite){
        const constructionSite: ConstructionSite = constSite;
        this.http.post<{message: string}>('http://localhost:3000/api/construction-sites', constructionSite)
        .subscribe((resData) => {
            console.log(resData.message)
            this.constructionSites.push(constructionSite) 
            this.constructionSitesUpdated.next([...this.constructionSites])
        });
    } 


   /* Выбранный строительный объект */
   private selectedConstructionSiteUpdated = new Subject<ConstructionSite>();
   private selectedConstructionSite: ConstructionSite;

   getSelectedConstructionSite(){
    return Object.assign({}, this.selectedConstructionSite)
    }
    selectConstructionSite(constSite: ConstructionSite){
    this.selectedConstructionSite = constSite;
    this.selectedConstructionSiteUpdated.next(Object.assign({}, this.selectedConstructionSite))
   }
   getSelectedConstructionSiteUpdateListener() {
      return this.selectedConstructionSiteUpdated.asObservable();
   }

}