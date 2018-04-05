import { FlightSearchService, FlightDetails } from './../../services/flight-search/flight-search.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import {Http, Response, RequestOptions, Headers, HttpModule} from '@angular/http';
import 'rxjs/add/operator/do';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})

export class FlightSearchComponent implements OnInit {
  erroTexr1:String;
  erroCode1: String;
  erroTexr2:String;
  erroCode2: String;
  fromCity:  String;
  toCity: String;
  dateVal: String;
  flagInd=false;
  checkValue: FlightDetails[];
  searchedFlightDetails: FlightDetails[];
  listFromCity : String[];
  distinctlistFromCity=[];
  selectedFromCity: String="";
  selectedDestCity: String ="";
  destinationCities: String[]=[];
  flightsAvailableIndicator = true;
  datepickerConfig: Partial<BsDatepickerConfig>;
  noOfPassenger: number;


  constructor(private http: Http, private flightSearchService : FlightSearchService) {
    this.datepickerConfig = Object.assign({},{containerClass:'theme-dark-blue',dateInputFormat: 'DD-MM-YYYY', minDate: new Date(),showWeekNumbers: false})

  };
   

  ngOnInit() {
    this.flightSearchService.getAllflightDetails().subscribe((data)=>{
      this.checkValue = data;
      this.listFromCity = this.checkValue.map(a=>{
        return a["fromCity"];
      });
      this.loadDitinctCity();
    },
    err=>{
      this.erroCode1 = `${err.status}`;
      this.erroTexr1 = `${err.statusText}`;
    });
   }


  onSubmit(form: NgForm){
  }


  onFromCityChange(selectedValue){
    this.selectedFromCity = selectedValue;
    this.doGetDestinationCity(this.selectedFromCity);
  }

  onDestinationChange(selectedValue){
    this.selectedDestCity = selectedValue;
  }

  loadDitinctCity(){
    for(var i=0; i<this.listFromCity.length; i++){
      if(!this.distinctlistFromCity.includes(this.listFromCity[i])){
        this.distinctlistFromCity.push(this.listFromCity[i]);
      }
    }
  }

  
  doGET(){
    var searchedToCities = [];
    var searchedFromCities =[];
    var searchedTeavelDates=[];
    var selectedDateInString = this.convertDate(this.dateVal);
    this.flightSearchService.fetchFlightDetails(this.selectedFromCity,this.selectedDestCity, selectedDateInString)
    .subscribe((data)=>{
      this.searchedFlightDetails = data;
      for(var j =0;j<this.searchedFlightDetails.length; j++){
        searchedFromCities[j] =`${this.searchedFlightDetails[j].fromCity}`;
        searchedToCities[j] =`${this.searchedFlightDetails[j].toCity}`;
        searchedTeavelDates[j] =`${this.searchedFlightDetails[j].dateVal}`;
      }
      if(this.searchedFlightDetails.length== 0){
        this.flightsAvailableIndicator=false;
      }
      else{
        this.flightsAvailableIndicator=true;
        this.flagInd = true;
      }
    },
    err=>{
      this.erroCode2 = `${err.status}`;
      this.erroTexr2 = `${err.statusText}`;
    });
  }

  doBook(fromCityValue, toCityValue, travelDateValue){
    this.flightSearchService.storeBookingDetails(this.selectedFromCity,this.selectedDestCity, travelDateValue,this.noOfPassenger);
  }




  doGetDestinationCity(selectedFromCity){
    
    for(var i=0; i<this.checkValue.length; i++){
      if(`${this.checkValue[i].fromCity}`==selectedFromCity){
        if(!((this.destinationCities).includes (`${this.checkValue[i].toCity}`))){
          this.destinationCities.push(`${this.checkValue[i].toCity}`);
        }
      }
    }
  }

  convertDate(dateValue): String {
    var formattedDate;
    var selectedMonIndex="";
    var selectedDate = dateValue.toString();
    let selectedDateComp =selectedDate.split(" ", 4);
    let selectedMon=selectedDateComp[1];
    let selectedDay= selectedDateComp[2];
    let selectedYear = selectedDateComp[3];
    if(selectedMon=="Jan"){
      selectedMonIndex="01"
    }
    else if(selectedMon=="Feb"){
      selectedMonIndex="02"
    }
    else if(selectedMon=="Mar"){
      selectedMonIndex="03"
    }
    else if(selectedMon=="Apr"){
      selectedMonIndex="04"
    }
    else if(selectedMon=="May"){
      selectedMonIndex="05"
    }
    else if(selectedMon=="Jun"){
      selectedMonIndex="06"
    }
    else if(selectedMon=="Jul"){
      selectedMonIndex="07"
    }
    else if(selectedMon=="Aug"){
      selectedMonIndex="08"
    }
    else if(selectedMon=="Sep"){
      selectedMonIndex="09"
    }
    else if(selectedMon=="Oct"){
      selectedMonIndex="10"
    }
    else if(selectedMon=="Nov"){
      selectedMonIndex="11"
    }
    else{
      selectedMonIndex="12"
    }
    formattedDate=selectedDay+"-"+selectedMonIndex+"-"+selectedYear;
    return formattedDate;
  };

}
