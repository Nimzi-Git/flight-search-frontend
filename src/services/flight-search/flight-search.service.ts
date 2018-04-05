import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers, HttpModule, RequestOptionsArgs} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

export class FlightDetails {
  constructor(public fromCity: String,
              public toCity: String,
              public dateVal: String){};
}

@Injectable()
export class FlightSearchService {
  baseUrl: String ="http://localhost:9090/all-flights";
  flightSearchURL: String = "http://localhost:9090/search-flight";
  bookSearchURL: String = "http://localhost:9090/book-flight";

  flightSearchDetails : String[];
  allFlightSearchDeatails : Object[];
  allToCitys : String[];

  constructor(private http:  Http) { };
/////////////////////////////Search All the Flights//////////////////////////////
//                                                                             //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////   
  getAllflightDetails(): Observable<FlightDetails[]>{
    let allFlightSearchURL = `${this.baseUrl}`;
    return this.http.get(allFlightSearchURL)
      .map(res =>   {
          return res.json().map(item =>{
            return new FlightDetails(
              item.fromCity,
              item.toCity,
              item.travelDate
          );
        });
      });
  }

////////Search Flights for particular from and to for a particular date//////////
//                                                                             //
//                                                                             //
///////////////////////////////////////////////////////////////////////////////// 
  fetchFlightDetails(fromCity: String, toCity: String, dateVal: String): Observable<FlightDetails[]>{
    let flightSearchCompUrl= `${this.flightSearchURL}/${fromCity}/${toCity}/${dateVal}`;
    return this.http.get(flightSearchCompUrl)
    .map(res =>   {
      return res.json().map(item =>{
        return new FlightDetails(
          item.fromCity,
          item.toCity,
          item.travelDate
      );
    });
  });
  }

////////////////////////////Store Booking Details////////////////////////////////
//                                                                             //
//                                                                             //
///////////////////////////////////////////////////////////////////////////////// 
storeBookingDetails(fromCity: String, toCity: String, dateVal: String, noOfPassenger:number): void{
  let flightSearchCompUrl= `${this.bookSearchURL}`;
  var headers =new Headers() ;
  headers = new Headers({ "Content-Type": "application/json" }); 
  const storeBookingDetailsReq = this.http.post(flightSearchCompUrl, {
    fromCity: fromCity,
    toCity: toCity,
    travelDate: dateVal,
    noOfTraveller: noOfPassenger
  },
  {
    headers: headers
  })
  .subscribe(
    res =>{
      console.log("Successfully Inserted Data");
    },
    err =>{
      console.log("Error Occured");
    }
  )
}

}
