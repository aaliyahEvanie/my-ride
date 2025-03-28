import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BikeObject } from '../types/bike-object';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BikeServiceService {

  private apiUrl = environment.bikeUrl
  response: BikeObject | undefined;

  constructor(private http: HttpClient) { }

  searchByCity(city: string): Observable<BikeObject[]> {  
    return this.http.get<{ bikes: any[] }>(this.apiUrl + '/search').pipe(
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
  }
}
