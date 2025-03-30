import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private autocompleteService!: google.maps.places.AutocompleteService;


  constructor() {
    this.loadGooglePlaces();
  }

  private loadGooglePlaces() {
    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
      this.autocompleteService = new google.maps.places.AutocompleteService();
    } else {
      console.error('Google Places API is not loaded.');
    }
  }

   searchCities(query: string): Promise<string[]>{
    return new Promise((resolve, reject) => {
      if(!query.trim()){
        resolve([])
        return
      }

      if (!this.autocompleteService) {
        this.loadGooglePlaces();
        reject('Google Places API not initialized.');
        return;
      }

      this.autocompleteService.getPlacePredictions({input: query, types: ['(cities)']},
        (predictions, status) => {
          if(status === google.maps.places.PlacesServiceStatus.OK && predictions){
            resolve(predictions.map((p) => p.structured_formatting.main_text))
          } else {
            resolve([])
          }
        }
      )
    })
   }
}
