import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { BikeObject } from '../types/bike-object';
import { catchError, map } from 'rxjs/operators';
import { Bikedetail } from '../types/bikedetail';

@Injectable({
  providedIn: 'root'
})
export class BikeServiceService {

  private apiUrl = environment.bikeUrl
  response: BikeObject | undefined;

  constructor(private http: HttpClient) { }

  /**TODO
   *  - Enable various filters on the search like stolen and proximity to give more accurate results
   *  - pagination 
   *  - verification 
   *  - Store of the searches (Add a clear on the frontend to reset)
   * 
   */

  searchByCity(city: string): Observable<BikeObject[]> {  
    const searchByCityUrl = this.apiUrl+ '/search?location='+ city +"&distance=0&stolenness=proximity"
    return this.http.get<{ bikes: any[] }>(searchByCityUrl).pipe(
      map((response: any) =>
        response.bikes.map((bike: BikeObject) => ({
          ...bike
        }))
      ),
      catchError(this.handleError<BikeObject[]>('searchByCity', []))
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
      }),
      catchError(this.handleError<Bikedetail>(`getBicycleDetails/id=${id}`, ))
    )
  }
/**
 * TODO:
 * connect to an errorMessage handler that the frontend can subscribe to
 */
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }
  
}
