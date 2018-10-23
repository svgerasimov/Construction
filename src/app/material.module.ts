import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
    imports: [
        MatButtonModule, 
        MatFormFieldModule, 
        MatInputModule,
        MatSidenavModule, 
        MatToolbarModule, 
        MatIconModule,
        MatListModule,
        MatPaginatorModule,
        MatTableModule,
        MatTabsModule,
        MatCardModule,
        MatDatepickerModule,
        MatRadioModule
    
    ],
    exports: [
        MatButtonModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatSidenavModule, 
        MatToolbarModule, 
        MatIconModule, 
        MatListModule,
        MatPaginatorModule,
        MatTableModule,
        MatTabsModule,
        MatCardModule,
        MatDatepickerModule,
        MatRadioModule
    ]
})
export class MaterialModule {}