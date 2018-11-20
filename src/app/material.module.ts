import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { 
        MatPaginatorModule, 
        MatTableModule, 
        MatNativeDateModule, 
        MatDialogModule 
        
    } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';



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
        MatNativeDateModule,
        MatDialogModule,
        MatTooltipModule,
        MatDividerModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatSelectModule
    
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
        MatRadioModule,
        MatNativeDateModule,
        MatDialogModule,
        MatTooltipModule,
        MatDividerModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatSelectModule
    ]
})
export class MaterialModule {}