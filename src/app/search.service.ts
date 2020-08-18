import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  // tslint:disable-next-line: variable-name
  private _getVenueUrl = "/findvenues/location=/sporttype=";
  constructor(private http: HttpClient) {}

  getVenues(searchObj): Observable<object[]> {
    this._getVenueUrl = `/findvenues/location:${searchObj.location}/sporttype:${searchObj.sporttype}`;
    //console.log(this._getVenueUrl);
    return this.http.get<object[]>(this._getVenueUrl);
  }

  getVenueDetails(venueID: string) {
    const url = `/findvenues/${venueID}`;

    return this.http.get<{ message: string; venueData: any }>(url);
  }
}
