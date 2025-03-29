import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BikeObject } from '../types/bike-object';
import { map } from 'rxjs/operators';
import { Bikedetail } from '../types/bikedetail';

@Injectable({
  providedIn: 'root'
})
export class BikeServiceService {

  private apiUrl = environment.bikeUrl
  response: BikeObject | undefined;

  constructor(private http: HttpClient) { }

  /**TODO
   * Enable various filters on the search like stolen and proximity to give more accurate results
   */

  searchByCity(city: string): Observable<BikeObject[]> {  
    const searchByCityUrl = this.apiUrl+ '/search?page=1&per_page=25&location='+ city +"&stolenness=non"
    return this.http.get<{ bikes: any[] }>(searchByCityUrl).pipe(
      map((response: any) =>
        response.bikes.map((bike: BikeObject) => ({
          ...bike
        }))
      )
    );
    //add error catch
    //cache the results 
    //add pagination and call to follow to next page
  }

  getBicycleDetails(id: number): Observable<Bikedetail>{
    const url = `${this.apiUrl}/bikes/${id}`
    return this.http.get<{bike: any}>(url).pipe(
      map(response => {
        const bike = response.bike;
        return {
        ...bike
        }
      })
    )
  }
  //error handling {"error": "Couldn't find Bike with id="XXXXXXX"}
}
