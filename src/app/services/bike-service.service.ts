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

  searchByCity(city: string): Observable<BikeObject[]> {  
    const searchByCityUrl = this.apiUrl+ '/search?page=1&per_page=25&location='+ city +"&stolenness=proximity"
    return this.http.get<{ bikes: any[] }>(searchByCityUrl).pipe(
      map((response: any) =>
        response.bikes.map((bike: { id: any; date_stolen: number; description: any; frame_colors: any; frame_model: any; status: any; title: any; url: any; }) => ({
          id: bike.id,
          date_stolen: new Date(bike.date_stolen * 1000), // Convert Unix timestamp to Date
          description: bike.description || '',
          frame_colors: bike.frame_colors || [],
          frame_model: bike.frame_model || '',
          status: bike.status || '',
          title: bike.title || '',
          url: bike.url || ''
        }))
      )
    );
    //add error catch
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
