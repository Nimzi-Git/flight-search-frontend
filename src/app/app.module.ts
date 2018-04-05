import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlightSearchService} from '../../src/services/flight-search/flight-search.service';

import { NgModule } from '@angular/core';
import {
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  DateAdapter,
  MAT_DATE_FORMATS,
  MatSnackBarModule
} from "@angular/material";

import { AppComponent } from './app.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { Http, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap'


@NgModule({
  declarations: [
    AppComponent,
    FlightSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpModule,
    FormsModule,
    BsDatepickerModule.forRoot()
   
  ],
  providers: [FlightSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
