import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { BikeObject } from '../types/bike-object';
import { catchError, map } from 'rxjs/operators';
import { Bikedetail } from '../types/bikedetail';
import { Severity } from '../types/messages';
import { error } from 'console';
import { MessageService } from './message-service.service';

@Injectable({
  providedIn: 'root'
})
export class BikeServiceService {
  private apiUrl = environment.bikeUrl
  response: BikeObject | undefined;
  bikes: any;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /**TODO
   *  - Enable various filters on the search like stolen and proximity to give more accurate results
   *  - pagination 
   *  - verification 
   *  - Store of the searches for retrievable when paging back from detail view (Add a clear on the frontend to reset)
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

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }
  
}
